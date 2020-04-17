import { ISetProfileData, ISetTariffsData } from '@src/types/actions/api';
import { ApiTypes } from '@constants/api';
import { TProfileDataState, TTariffsDataState } from '@src/types/reducers/api';

export const setProfileData = (value: TProfileDataState): ISetProfileData => ({
  type: ApiTypes.SET_PROFILE,
  payload: value,
});

export const setTariffsData = (value: TTariffsDataState): ISetTariffsData => ({
  type: ApiTypes.SET_TARIFFS,
  payload: value,
});
