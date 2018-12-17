import * as Chance from 'chance';
import { ApiGateway, DeviceApi, MessageApi } from './api';
import { SmsGateway } from './sms-gateway';

jest.mock('./api');

describe('SmsGateway', () => {
  describe('constructor', () => {
    const chance = new Chance();
    let token: string;
    let gateway: ApiGateway;
    let device: DeviceApi;
    let message: DeviceApi;
    let smsGateway: SmsGateway;

    beforeAll(() => {
      token = chance.word();
      gateway = { dummy: chance.word() } as any;
      device = { dummy: chance.word() } as any;
      message = { dummy: chance.word() } as any;
      (ApiGateway as jest.Mock<ApiGateway>).mockImplementation(() => gateway);
      (DeviceApi as jest.Mock<DeviceApi>).mockImplementation(() => device);
      (MessageApi as jest.Mock<MessageApi>).mockImplementation(() => message);

      smsGateway = new SmsGateway(token);
    });

    it('should construct Gateway and pass token to it', () => {
      expect(ApiGateway).toHaveBeenCalledTimes(1);
      expect(ApiGateway).toHaveBeenCalledWith(token);
    });
    it('should construct Device and pass gateway to it', () => {
      expect(DeviceApi).toHaveBeenCalledTimes(1);
      expect(DeviceApi).toHaveBeenCalledWith(gateway);
    });
    it('should expose constructed Device on `device` property', () => {
      expect(smsGateway.device).toBe(device);
    });
    it('should construct Message and pass gateway to it', () => {
      expect(MessageApi).toHaveBeenCalledTimes(1);
      expect(MessageApi).toHaveBeenCalledWith(gateway);
    });
    it('should expose constructed Message on `message` property', () => {
      expect(smsGateway.message).toBe(message);
    });
  });
});
