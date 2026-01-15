import { test, expect } from '../../fixtures/apiClient';
import { buildPostPayload } from '../../helpers/factories';

test('POST /posts @posts @post', async ({ api }) => {
    const payload = buildPostPayload();
    const post = await api.posts.create(payload);
    expect(post.title).toBe(payload.title);
    expect(post.body).toBe(payload.body);
});

test('POST /posts validates id and user @posts @post', async ({ api }) => {
    const payload = buildPostPayload();
    const post = await api.posts.create(payload);
    expect(post.userId).toBe(payload.userId);
    expect(post.id).toBeGreaterThan(0);
});
