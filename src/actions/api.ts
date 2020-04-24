import { ISetProfileData, ISetTariffsData, ISetCardData, ISetSubscriptionsData } from '@src/types/actions/api';
import { ApiTypes } from '@constants/api';
import { TProfileDataState, TTariffsDataState, TCardState, TSubscriptionsState } from '@src/types/reducers/api';

export const setProfileData = (value: TProfileDataState): ISetProfileData => ({
  type: ApiTypes.SET_PROFILE,
  payload: value,
});

export const setTariffsData = (value: TTariffsDataState): ISetTariffsData => ({
  type: ApiTypes.SET_TARIFFS,
  payload: value,
});

export const setCardData = (value: TCardState): ISetCardData => ({
  type: ApiTypes.SET_CARD_DATA,
  payload: value,
});

export const setSubscriptionsData = (value: TSubscriptionsState): ISetSubscriptionsData => ({
  type: ApiTypes.SET_SUBSCRIPTIONS_DATA,
  payload: value,
});
