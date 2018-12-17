# smsgateway.me

A Node.js wrapper of [smsgateway.me](https://smsgateway.me) v4 api.

## Installing

Via npm:

```bash
$ npm install [-g] smsgateway.me
```

## Available methods

* message.send(messages: INewMessage[]): Promise<IMessage[]>
* message.info(messageId: number): Promise<IMessage>
* message.search(query: IQuery<IMessage>): Promise<ISearchResult<IMessage>>
* message.cancel(messages: IMessageCancel[]): Promise<IMessage[]>
* device.info(deviceId: number)
* device.search(query: IQuery<IDevice>)

## Usage

### Send message
```typescript
import { IMessage, INewMessage, SmsGateway } from 'smsgateway.me';

/* You can get token from https://smsgateway.me/dashboard/settings */
const token = 'YOUR_TOKEN';
/* You can get deviceId from https://smsgateway.me/dashboard/devices or by calling gateway.device.search() */
const deviceId = 'YOUR_DEVICE';
const gateway = new SmsGateway(token);

const newMessages: INewMessage[] = [
  {
    device_id: deviceId,
    message: 'some message',
    phone_number: 'phone number',
  },
  {
    device_id: deviceId,
    message: 'another some message',
    phone_number: 'other or same phone number',
  },
];

gateway.message.send(newMessages)
  .then((messages: IMessage[]) => console.info('Messages send:', messages))
  .catch((err: any) => console.error(err));
```

### Search for messages
```typescript
import { IMessage, IQuery, ISearchResult, SmsGateway } from 'smsgateway.me';

const gateway = new SmsGateway('YOUR_TOKEN');
const query: IQuery<IMessage> = {
  filters: [
    [
      {
        field: 'status',
        operator: '=',
        value: 'canceled',
      },
    ],
  ],
  limit: 1,
};

gateway.message.search(query)
  .then((response: ISearchResult<IMessage>) => console.info('Messages found:', response))
  .catch((err: any) => console.error(err));
```

### Fetch info about message
```typescript
import { IMessage, IQuery, ISearchResult, SmsGateway } from 'smsgateway.me';

const gateway = new SmsGateway('YOUR_TOKEN');
const messageId: number = 71234567;

gateway.message.info(messageId)
  .then((message: IMessage) => console.info('Message info:', message))
  .catch((err: any) => console.error(err));
```

### Cancel messages
```typescript
import { IMessage, IMessageCancel, IQuery, ISearchResult, SmsGateway } from 'smsgateway.me';

const gateway = new SmsGateway('YOUR_TOKEN');
const messagesToCancel: IMessageCancel[] = [{ id: 71234567 }];

gateway.message.cancel(messagesToCancel)
  .then((messages: IMessage[]) => console.info('Canceled message: ', messages))
  .catch((err: any) => console.error(err));
```

### Search for devices
```typescript
import { IDevice, IQuery, ISearchResult, SmsGateway } from 'smsgateway.me';

const gateway = new SmsGateway('YOUR_TOKEN');
const query: IQuery<IDevice> = {};

gateway.device.search(query)
  .then((response: ISearchResult<IDevice>) => console.info('Found devices:', response))
  .catch((err: any) => console.error(err));
```

### Fetch device info
```typescript
import { IDevice, IQuery, ISearchResult, SmsGateway } from 'smsgateway.me';

const gateway = new SmsGateway('YOUR_TOKEN');
const deviceId: number = 101234;

gateway.device.info(deviceId)
  .then((device: IDevice) => console.info('Device info:', device))
  .catch((err: any) => console.error(err));
```
