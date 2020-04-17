export interface ISuccessRefreshTokenResponse {
  code: number;
  payload: {
    expire: string;
    token: string;
  };
}

export interface IFailedRefreshTokenResponse {
  code: number;
  massage: string;
}
