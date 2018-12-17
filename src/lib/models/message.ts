export type IStatus = 'pending' | 'canceled' | 'queued' | 'sent';

export interface ILogItem {
  status: IStatus;
  occurred_at: string;
}

export interface INewMessage {
  phone_number: string;
  message: string;
  device_id?: number;
}

export interface IMessage extends INewMessage {
  id: number;
  device_id: number;
  status: IStatus;
  log: ILogItem[];
  updated_at: string;
  created_at: string;
}

export interface IMessageCancel {
  id: number;
}
