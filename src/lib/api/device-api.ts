import { IDevice, IQuery, ISearchResult } from '../models';
import { Sender } from './sender';

const path = {
  info: (deviceId: number): string => `device/${deviceId}`,
  search: (): string => `device/search`,
};

export class DeviceApi extends Sender {
  public info(deviceId: number) {
    return this.gateway.get<IDevice>(path.info(deviceId));
  }

  public search(query: IQuery<IDevice>) {
    return this.gateway.post<ISearchResult<IDevice>>(path.search(), { body: query });
  }
}
