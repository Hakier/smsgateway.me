import * as Chance from 'chance';
import { IDevice, IQuery } from '../models';
import { ApiGateway } from './api-gateway';
import { DeviceApi } from './device-api';
import { Sender } from './sender';

jest.mock('./api-gateway');

describe('DeviceApi', () => {
  const chance = new Chance();

  it('should extend Sender', () => {
    expect(Sender.isPrototypeOf(DeviceApi)).toBeTruthy();
  });
  describe('method', () => {
    describe('info', () => {
      let gateway: ApiGateway;
      let deviceId: number;
      let result: string;

      beforeAll(async () => {
        gateway = new ApiGateway(chance.word());
        deviceId = chance.d12();

        gateway.get = jest.fn(() => 'GET request result');

        result = await (new DeviceApi(gateway)).info(deviceId) as any;
      });

      it('should perform GET request to `/device/${deviceId}` with given deviceId', () => {
        expect(gateway.get).toHaveBeenCalledTimes(1);
        expect(gateway.get).toHaveBeenCalledWith(`device/${deviceId}`);
      });
      it('should return result of GET request', () => {
        expect(result).toEqual('GET request result');
      });
    });
    describe('search', () => {
      let gateway: ApiGateway;
      let query: IQuery<IDevice>;
      let result: string;

      beforeAll(async () => {
        gateway = new ApiGateway(chance.word());
        query = {
          filters: [
            [
              {
                field: 'status',
                operator: '=',
                value: chance.word(),
              },
            ],
          ],
          limit: 1,
        };

        gateway.post = jest.fn(() => 'POST request result');

        result = await (new DeviceApi(gateway)).search(query) as any;
      });

      it('should perform POST request to `/device/search` with given query', () => {
        expect(gateway.post).toHaveBeenCalledTimes(1);
        expect(gateway.post).toHaveBeenCalledWith('device/search', { body: query });
      });
      it('should return result of POST request', () => {
        expect(result).toEqual('POST request result');
      });
    });
  });
});
