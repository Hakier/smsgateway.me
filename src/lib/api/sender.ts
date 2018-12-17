import { ApiGateway } from './api-gateway';

export abstract class Sender {
  constructor(protected gateway: ApiGateway) {}
}
