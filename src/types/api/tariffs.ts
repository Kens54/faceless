import { ITariffsDataItem } from '../reducers/api';

export interface ISuccessTariffsResponse {
  code: number;
  payload: ITariffsDataItem[];
}

export interface IFailedTariffsResponse {
  code: number;
  message: string;
}
