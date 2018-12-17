import { IMessage, IMessageCancel, INewMessage, IQuery, ISearchResult } from '../models';
import { Sender } from './sender';

const path = {
  cancel: (): string => 'message/cancel',
  info: (messageId: number): string => `message/${messageId}`,
  search: (): string => 'message/search',
  send: (): string => 'message/send',
};

export class MessageApi extends Sender {
  public send(messages: INewMessage[]): Promise<IMessage[]> {
    return this.gateway.post(path.send(), { body: messages });
  }

  public info(messageId: number): Promise<IMessage> {
    return this.gateway.get(path.info(messageId));
  }

  public search(query: IQuery<IMessage>): Promise<ISearchResult<IMessage>> {
    return this.gateway.post(path.search(), { body: query });
  }

  public cancel(messages: IMessageCancel[]): Promise<IMessage[]> {
    return this.gateway.post(path.cancel(), { body: messages });
  }
}
