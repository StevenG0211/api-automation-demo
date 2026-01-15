import { expect } from '@playwright/test';
import type { ResponseResult } from '../clients/baseClient';
import type { Post } from '../types/posts';

export const expectStatus = (response: ResponseResult<unknown>, expected: number): void => {
  expect(response.status).toBe(expected);
};

export const expectPostShape = (data: unknown): Post => {
  expect(data).toEqual(
    expect.objectContaining({
      userId: expect.any(Number),
      id: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
    }),
  );

  return data as Post;
};
