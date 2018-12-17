import * as Chance from 'chance';
import { IMessage, IMessageCancel, INewMessage, IQuery } from '../models';
import { ApiGateway } from './api-gateway';
import { MessageApi } from './message-api';
import { Sender } from './sender';

jest.mock('./api-gateway');

describe('MessageApi', () => {
  const chance = new Chance();

  it('should extend Sender', () => {
    expect(Sender.isPrototypeOf(MessageApi)).toBeTruthy();
  });
  describe('method', () => {
    describe('send', () => {
      let gateway: ApiGateway;
      let messages: INewMessage[];
      let result: string;

      beforeAll(async () => {
        gateway = new ApiGateway(chance.word());
        messages = [
          { phone_number: chance.phone(), message: chance.sentence(), device_id: chance.d12() },
          { phone_number: chance.phone(), message: chance.sentence(), device_id: chance.d12() },
        ];

        gateway.post = jest.fn(() => 'POST request result');

        result = await (new MessageApi(gateway)).send(messages) as any;
      });

      it('should perform POST request to `/message/send` with given messages', () => {
        expect(gateway.post).toHaveBeenCalledTimes(1);
        expect(gateway.post).toHaveBeenCalledWith('message/send', { body: messages });
      });
      it('should return result of POST request', () => {
        expect(result).toEqual('POST request result');
      });
    });
    describe('info', () => {
      let gateway: ApiGateway;
      let messageId: number;
      let result: string;

      beforeAll(async () => {
        gateway = new ApiGateway(chance.word());
        messageId = chance.d12();

        gateway.get = jest.fn(() => 'GET request result');

        result = await (new MessageApi(gateway)).info(messageId) as any;
      });

      it('should perform GET request to `/message/${messageId}` with given contacts', () => {
        expect(gateway.get).toHaveBeenCalledTimes(1);
        expect(gateway.get).toHaveBeenCalledWith(`message/${messageId}`);
      });
      it('should return result of GET request', () => {
        expect(result).toEqual('GET request result');
      });
    });
    describe('search', () => {
      let gateway: ApiGateway;
      let query: IQuery<IMessage>;
      let result: string;

      beforeAll(async () => {
        gateway = new ApiGateway(chance.word());
        query = {
          filters: [
            [
              {
                field: 'message',
                operator: '=',
                value: chance.sentence(),
              },
            ],
          ],
          limit: 1,
        };

        gateway.post = jest.fn(() => 'POST request result');

        result = await (new MessageApi(gateway)).search(query) as any;
      });

      it('should perform POST request to `/message/search` with given query', () => {
        expect(gateway.post).toHaveBeenCalledTimes(1);
        expect(gateway.post).toHaveBeenCalledWith('message/search', { body: query });
      });
      it('should return result of POST request', () => {
        expect(result).toEqual('POST request result');
      });
    });
    describe('cancel', () => {
      let gateway: ApiGateway;
      let messages: IMessageCancel[];
      let result: string;

      beforeAll(async () => {
        gateway = new ApiGateway(chance.word());
        messages = [
          { id: chance.d12() },
          { id: chance.d12() },
          { id: chance.d12() },
        ];

        gateway.post = jest.fn(() => 'POST request result');

        result = await (new MessageApi(gateway)).cancel(messages) as any;
      });

      it('should perform POST request to `/message/cancel` with given messages', () => {
        expect(gateway.post).toHaveBeenCalledTimes(1);
        expect(gateway.post).toHaveBeenCalledWith('message/cancel', { body: messages });
      });
      it('should return result of POST request', () => {
        expect(result).toEqual('POST request result');
      });
    });
  });
});
