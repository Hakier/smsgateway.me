import * as Chance from 'chance';
import * as request from 'request-promise';
import { ApiGateway } from './api-gateway';

jest.mock('request-promise');

describe('Gateway', () => {
  const chance = new Chance();

  describe('constructor', () => {
    let token: string;
    let gateway: ApiGateway;

    beforeAll(() => {
      token = chance.word();

      gateway = new ApiGateway(token);
    });

    it('should save token as private property', () => {
      expect((gateway as any).token).toBe(token);
    });
  });
  describe('method', () => {
    describe('get', () => {
      let gateway: ApiGateway;
      let path: string;
      let options: object;
      let result: string;

      beforeAll(async () => {
        gateway = new ApiGateway(chance.word());
        path = chance.word();
        options = { json: false, method: 'dummy' };

        gateway.request = jest.fn(() => 'request result');

        result = await gateway.get(path, options);
      });

      it('should perform GET request', () => {
        expect(gateway.request).toHaveBeenCalledTimes(1);
        expect(gateway.request).toHaveBeenCalledWith(path, { json: false, method: 'GET' });
      });
      it('should return result of request', () => {
        expect(result).toEqual('request result');
      });
    });
    describe('post', () => {
      let gateway: ApiGateway;
      let path: string;
      let options: object;
      let result: string;

      beforeAll(async () => {
        gateway = new ApiGateway(chance.word());
        path = chance.word();
        options = { json: false, method: 'dummy' };

        gateway.request = jest.fn(() => 'request result');

        result = await gateway.post(path, options);
      });

      it('should perform POST request', () => {
        expect(gateway.request).toHaveBeenCalledTimes(1);
        expect(gateway.request).toHaveBeenCalledWith(path, { json: false, method: 'POST' });
      });
      it('should return result of request', () => {
        expect(result).toEqual('request result');
      });
    });
    describe('request', () => {
      let gateway: ApiGateway;
      let path: string;
      let options: object;
      let result: string;

      beforeAll(async () => {
        gateway = new ApiGateway(chance.word());
        path = chance.word();
        options = { method: 'GET' };

        (gateway as any).decorateOptions = jest.fn(() => 'result of decorateOptions');
        (request as any as jest.Mock).mockReturnValue('result of request');

        result = await gateway.request(path, options);
      });

      it('should call decorateOptions to create and modify options with given path and options', () => {
        expect((gateway as any).decorateOptions).toHaveBeenCalledTimes(1);
        expect((gateway as any).decorateOptions).toHaveBeenCalledWith(path, options);
      });
      it('should call request with result of decorateOptions to perform request', () => {
        expect(request).toHaveBeenCalledTimes(1);
        expect(request).toHaveBeenCalledWith('result of decorateOptions');
      });
      it('should return result of request', () => {
        expect(result).toBe('result of request');
      });
    });
    describe('decorateOptions', () => {
      describe('when only path given', () => {
        let token: string;
        let gateway: ApiGateway;
        let path: string;

        beforeAll(() => {
          token = chance.word();
          gateway = new ApiGateway(token);
          path = chance.word();
        });

        it('should return options to perform json request with token', () => {
          expect((gateway as any).decorateOptions(path)).toEqual({
            headers: { Authorization: token },
            json: true,
            uri: `https://smsgateway.me/api/v4/${path}`,
          });
        });
      });
      describe('when path and options given', () => {
        let token: string;
        let gateway: ApiGateway;
        let path: string;

        beforeAll(() => {
          token = chance.word();
          gateway = new ApiGateway(token);
          path = chance.word();
        });

        it('should return options to perform json request with token extended with given options', () => {
          const options = { headers: { 'user-agent': 'golem' }, method: 'POST' };

          expect((gateway as any).decorateOptions(path, options)).toEqual({
            headers: { 'user-agent': 'golem' },
            json: true,
            method: 'POST',
            uri: `https://smsgateway.me/api/v4/${path}`,
          });
        });
      });
    });
  });
});
