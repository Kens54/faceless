interface ISetup {
  cloud: string;
  description: string;
  id: number;
  name: string;
}

export interface ISuccessSetupsResponse {
  code: number;
  payload: ISetup[];
}
