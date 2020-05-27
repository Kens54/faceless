import { ISetStepAction } from '@src/types/actions/profilePage';
import { TProfilePageStep } from '@src/types/reducers/profilePage';
import { ProfilePageActionTypes } from '@src/constants/profilePage';

export const setProfilePageStep = (value: TProfilePageStep): ISetStepAction => {
  return {
    type: ProfilePageActionTypes.SET_PROFILE_STEP,
    payload: value,
  };
};
