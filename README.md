# api-automation-demo
Basic API automation demo using Playwright with fixture-based clients.

## Structure
- `clients/`: HTTP clients per resource
- `fixtures/`: Playwright fixtures exposing typed API clients
- `helpers/`: validators and data factories
- `tests/`: clean tests per module
- `types/`: shared resource types

## Install
```bash
npm install
npx playwright install
```

## Run Tests
```bash
npm test
```

### Run a tagged module from CI
Use the generic module runner, which filters by tag.
```bash
MODULE=posts npm run test:module
```

### Run module-specific tests
```bash
npm run test:posts
```

### Run operation-specific tests
```bash
npm run test:posts:get
npm run test:posts:post
npm run test:posts:update
npm run test:posts:delete
```

## Targeting via PR comments
Each test title includes tags like `@posts`, `@get`, `@post`, `@update`, `@delete`.
The PR comment workflow listens for:
```text
/run module=posts
/run module=posts scope=get
```
This triggers a CI job that runs `@posts` or `@posts` + `@get` tests only.

## Module mapping and dependencies
Module selection is defined in `tests/module-map.json`. Each module lists:
- `paths`: globs used to detect changes
- `tags`: tags used to run tests
- `deps`: dependent modules that should run when shared code changes

When no module matches, the workflow falls back to a module marked `"default": true`.
