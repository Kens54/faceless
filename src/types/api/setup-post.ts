export interface ISuccessSetupPostRequest {
  code: number;
  payload: {
    id: number;
    user_id: number;
    setup_id: number;
    setup_status: string;
    used_our_resources: boolean;
    last_action: string;
    created_at: Date;
    updated_at: Date;
  };
}
