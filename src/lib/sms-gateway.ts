import { ApiGateway, DeviceApi, MessageApi } from './api';

export class SmsGateway {
  public device: DeviceApi;
  public message: MessageApi;

  constructor(token: string) {
    const gateway = new ApiGateway(token);

    this.device = new DeviceApi(gateway);
    this.message = new MessageApi(gateway);
  }
}
