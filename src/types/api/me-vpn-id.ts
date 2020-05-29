import { TSetupStatus } from './setup-status';

export interface ISuccessMeVpnIdRequest {
  code: number;
  payload: {
    complete_percents: number;
    created_at: Date;
    id: number;
    last_action: string;
    setup_id: number;
    setup_status: TSetupStatus;
    updated_at: Date;
    used_our_resources: boolean;
    user_id: number;
  };
}
