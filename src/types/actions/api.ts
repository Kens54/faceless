import { ApiTypes } from '@constants/api';
import { TProfileDataState, TTariffsDataState, TCardState, TSubscriptionsState } from '@src/types/reducers/api';

export type TApiActions = ISetProfileData | ISetTariffsData | ISetCardData | ISetSubscriptionsData;

export interface ISetProfileData {
  type: ApiTypes.SET_PROFILE;
  payload: TProfileDataState;
}

export interface ISetTariffsData {
  type: ApiTypes.SET_TARIFFS;
  payload: TTariffsDataState;
}

export interface ISetCardData {
  type: ApiTypes.SET_CARD_DATA;
  payload: TCardState;
}

export interface ISetSubscriptionsData {
  type: ApiTypes.SET_SUBSCRIPTIONS_DATA;
  payload: TSubscriptionsState;
}
