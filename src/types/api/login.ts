interface ILoginSuccessResponse {
  code: 200;
  payload: {
    expire: string;
    token: string;
  };
}

interface ILoginFailedResponse {
  code: number;
  message: string;
}
