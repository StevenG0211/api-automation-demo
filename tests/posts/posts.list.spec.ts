import { test, expect } from '../../fixtures/apiClient';

test('GET /posts returns list of posts @posts @get @list', async ({ api }) => {
  const posts = await api.posts.getAll();
  expect(posts.length).toBeGreaterThan(0);
  expect(posts[0]).toHaveProperty('id');
  expect(posts[0]).toHaveProperty('title');
  expect(posts[0]).toHaveProperty('body');
  expect(posts[0]).toHaveProperty('userId');
});

test('GET /posts returns valid post structure @posts @get @list', async ({ api }) => {
  const posts = await api.posts.getAll();
  const firstPost = posts[0];
  expect(typeof firstPost.id).toBe('number');
  expect(typeof firstPost.userId).toBe('number');
  expect(typeof firstPost.title).toBe('string');
  expect(typeof firstPost.body).toBe('string');
});
