import fs from 'node:fs';

const MAP_PATH = 'tests/module-map.json';

const readStdin = () => {
  if (process.stdin.isTTY) {
    return '';
  }
  return fs.readFileSync(0, 'utf8');
};

const normalizePath = (value) => value.replace(/\\/g, '/');

const globToRegExp = (glob) => {
  const normalized = normalizePath(glob);
  let regex = '^';
  let i = 0;
  while (i < normalized.length) {
    const char = normalized[i];
    if (char === '*') {
      const next = normalized[i + 1];
      if (next === '*') {
        regex += '.*';
        i += 2;
      } else {
        regex += '[^/]*';
        i += 1;
      }
      continue;
    }
    if (char === '?') {
      regex += '[^/]';
      i += 1;
      continue;
    }
    if ('\\.[]{}()+-^$|'.includes(char)) {
      regex += `\\${char}`;
    } else {
      regex += char;
    }
    i += 1;
  }
  regex += '$';
  return new RegExp(regex);
};

const map = JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'));
const moduleEntries = Object.entries(map);

const args = process.argv.slice(2);
const input = readStdin();
const rawFiles = [...args, input]
  .flatMap((value) => value.split(/\r?\n/))
  .map((value) => value.trim())
  .filter(Boolean);

const files = rawFiles.map(normalizePath);

const impacted = new Set();

for (const [moduleName, config] of moduleEntries) {
  const paths = config.paths ?? [];
  const patterns = paths.map(globToRegExp);
  if (files.some((file) => patterns.some((pattern) => pattern.test(file)))) {
    impacted.add(moduleName);
  }
}

let expanded = true;
while (expanded) {
  expanded = false;
  for (const [moduleName, config] of moduleEntries) {
    const deps = config.deps ?? [];
    if (deps.some((dep) => impacted.has(dep)) && !impacted.has(moduleName)) {
      impacted.add(moduleName);
      expanded = true;
    }
  }
}

if (impacted.size === 0) {
  for (const [moduleName, config] of moduleEntries) {
    if (config.default === true) {
      impacted.add(moduleName);
    }
  }
}

if (impacted.size === 0) {
  for (const [moduleName, config] of moduleEntries) {
    if ((config.tags ?? []).length > 0) {
      impacted.add(moduleName);
    }
  }
}

const runnable = [...impacted].filter((moduleName) => {
  const tags = map[moduleName]?.tags ?? [];
  return tags.length > 0;
});

process.stdout.write(`${JSON.stringify(runnable)}\n`);
