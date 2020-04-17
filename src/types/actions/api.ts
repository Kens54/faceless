import { ApiTypes } from '@constants/api';
import { TProfileDataState, TTariffsDataState } from '@src/types/reducers/api';

export type TApiActions = ISetProfileData | ISetTariffsData;

export interface ISetProfileData {
  type: ApiTypes.SET_PROFILE;
  payload: TProfileDataState;
}

export interface ISetTariffsData {
  type: ApiTypes.SET_TARIFFS;
  payload: TTariffsDataState;
}
