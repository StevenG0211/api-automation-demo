import type { APIRequestContext, APIResponse } from '@playwright/test';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestOptions = {
  data?: unknown;
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
  timeout?: number;
};

export type ResponseResult<T> = {
  status: number;
  data: T;
  headers: Record<string, string>;
};

export class BaseClient {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async get<T>(path: string, options: RequestOptions = {}): Promise<ResponseResult<T>> {
    return this.requestJson<T>('GET', path, options);
  }

  async post<T>(path: string, options: RequestOptions = {}): Promise<ResponseResult<T>> {
    return this.requestJson<T>('POST', path, options);
  }

  async put<T>(path: string, options: RequestOptions = {}): Promise<ResponseResult<T>> {
    return this.requestJson<T>('PUT', path, options);
  }

  async patch<T>(path: string, options: RequestOptions = {}): Promise<ResponseResult<T>> {
    return this.requestJson<T>('PATCH', path, options);
  }

  async delete<T>(path: string, options: RequestOptions = {}): Promise<ResponseResult<T>> {
    return this.requestJson<T>('DELETE', path, options);
  }

  private async requestJson<T>(
    method: HttpMethod,
    path: string,
    options: RequestOptions,
  ): Promise<ResponseResult<T>> {
    const response = await this.request.fetch(path, {
      method,
      data: options.data,
      params: options.params,
      headers: options.headers,
      timeout: options.timeout,
    });

    return {
      status: response.status(),
      data: (await this.safeJson<T>(response)) as T,
      headers: response.headers(),
    };
  }

  private async safeJson<T>(response: APIResponse): Promise<T | null> {
    try {
      return (await response.json()) as T;
    } catch {
      return null;
    }
  }
}
