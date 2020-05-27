import { TProfilePageStep } from '@src/types/reducers/profilePage';
import { ProfilePageActionTypes } from '@constants/profilePage';

export type TPageActions = ISetStepAction;

export interface ISetStepAction {
  type: ProfilePageActionTypes.SET_PROFILE_STEP;
  payload: TProfilePageStep;
}
