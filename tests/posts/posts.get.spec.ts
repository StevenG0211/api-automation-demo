import { test, expect } from '../../fixtures/apiClient';

test('GET /posts/:id @posts @get', async ({ api }) => {
  const post = await api.posts.get(1);
  expect(post.id).toBe(1);
});
