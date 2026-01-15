import { test as base, expect } from '@playwright/test';
import { BaseClient } from '../clients/baseClient';
import { PostsClient } from '../clients/postsClient';

type ApiClients = {
  posts: PostsClient;
};

export const test = base.extend<{ api: ApiClients }>({
  api: async ({ request }, use) => {
    const baseClient = new BaseClient(request);
    const posts = new PostsClient(baseClient);
    await use({ posts });
  },
});

export { expect };
