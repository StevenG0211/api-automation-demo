import type { PostInput } from '../types/posts';

export const buildPostPayload = (overrides: Partial<PostInput> = {}): PostInput => ({
  userId: 1,
  title: 'API automation demo',
  body: 'Playwright API tests for JSONPlaceholder.',
  ...overrides,
});
