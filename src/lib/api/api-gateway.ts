import * as request from 'request-promise';

export class ApiGateway {
  constructor(private token: string) {}

  public get<T>(path: string, options: any = {}): Promise<T> {
    return this.request<T>(path, { ...options, ...{ method: 'GET' } });
  }

  public post<T>(path: string, options: any = {}): Promise<T> {
    return this.request<T>(path, { ...options, ...{ method: 'POST' } });
  }

  public request<T>(path: string, options: any = {}): Promise<T> {
    return request(this.decorateOptions(path, options)) as any;
  }

  private decorateOptions(path: string, options?: any) {
    return {
      ...{
        headers: {
          Authorization: this.token,
        },
        json: true,
        uri: `https://smsgateway.me/api/v4/${path}`,
      },
      ...options,
    };
  }
}
