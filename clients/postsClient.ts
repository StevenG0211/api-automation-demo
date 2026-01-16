import { expect } from '@playwright/test';
import type { BaseClient } from './baseClient';
import type { Post, PostInput } from '../types/posts';
import { expectPostShape, expectStatus } from '../helpers/validators';

export class PostsClient {
  private readonly baseClient: BaseClient;

  constructor(baseClient: BaseClient) {
    this.baseClient = baseClient;
  }

  async getAll(): Promise<Post[]> {
    const response = await this.baseClient.get<Post[]>('/posts');
    expectStatus(response, 200);
    expect(Array.isArray(response.data)).toBe(true);
    return response.data.map((post) => expectPostShape(post));
  }

  async get(id: number): Promise<Post> {
    const response = await this.baseClient.get<Post>(`/posts/${id}`);
    expectStatus(response, 200);
    return expectPostShape(response.data);
  }

  async create(payload: PostInput): Promise<Post> {
    const response = await this.baseClient.post<Post>('/posts', { data: payload });
    expectStatus(response, 201);
    return expectPostShape(response.data);
  }

  async update(
    id: number,
    payload: Partial<PostInput>,
    method: 'patch' | 'put' = 'patch',
  ): Promise<Post> {
    const path = `/posts/${id}`;
    const response =
      method === 'put'
        ? await this.baseClient.put<Post>(path, { data: payload })
        : await this.baseClient.patch<Post>(path, { data: payload });
    expectStatus(response, 200);
    return expectPostShape(response.data);
  }

  async delete(id: number): Promise<number> {
    const response = await this.baseClient.delete<unknown>(`/posts/${id}`);
    expectStatus(response, 200);
    return response.status;
  }
}
