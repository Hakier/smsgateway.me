export interface IDevice {
  id: number;
  name: string;
  attributes: {
    phone_number: string;
    last_seen: string;
    fcm: string;
    /* Below is a list of attributes that were listed in spec but not available via api */
    // make?: string;
    // model?: string;
    // provider?: string;
    // country?: string;
    // connection_type?: string;
    // battery?: string;
    // signal_percent?: string;
    // wifi?: true,
    // lat?: string;
    // lng?: string;
  };
}
