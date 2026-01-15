import { test, expect } from '../../fixtures/apiClient';
import { buildPostPayload } from '../../helpers/factories';

test('PATCH /posts/:id @posts @update @patch', async ({ api }) => {
  const payload = buildPostPayload({ title: 'Updated title' });
  const post = await api.posts.update(1, { title: payload.title }, 'patch');
  expect(post.title).toBe(payload.title);
});

test('PUT /posts/:id @posts @update @put', async ({ api }) => {
  const payload = buildPostPayload({
    title: 'Replaced title',
    body: 'Replaced body',
  });
  const post = await api.posts.update(1, payload, 'put');
  expect(post.title).toBe(payload.title);
  expect(post.body).toBe(payload.body);
});
