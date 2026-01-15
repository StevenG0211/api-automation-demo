import { test, expect } from '../../fixtures/apiClient';

test('DELETE /posts/:id @posts @delete', async ({ api }) => {
  const status = await api.posts.delete(1);
  expect(status).toBe(200);
});
