import { IProfilePageState } from '@src/types/reducers/profilePage';
import { ProfilePageActionTypes } from '@src/constants/profilePage';
import { TPageActions } from '@src/types/actions/profilePage';

const initialState: IProfilePageState = {
  step: 'profile',
};

export const profilePage = (state = initialState, action: TPageActions) => {
  switch (action.type) {
    case ProfilePageActionTypes.SET_PROFILE_STEP:
      return { ...state, step: action.payload };
    default:
      return { ...state };
  }
};
