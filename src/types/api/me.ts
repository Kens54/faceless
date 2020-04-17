export interface IMeSuccessResponse {
  code: 200;
  payload: {
    email: string;
    expires_in: number;
    full_name: string;
    id: number;
    is_expired: boolean;
    role: string;
    status: string;
    type: string;
    payment_type: string;
  };
}

export interface IMeFailedResponse {
  code: number;
  message: string;
}
