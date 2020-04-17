export interface IRegisterSuccessResponse {
  code: 200;
  payload: {
    expire: string;
    token: string;
  };
}

export interface IRegisterFailedResponse {
  code: number;
  message: string;
}
