import { IApiState } from '@src/types/reducers/api';
import { ApiTypes } from '@constants/api';
import { TApiActions } from '@src/types/actions/api';

const initialState: IApiState = {
  profile: null,
  tariffs: null,
};

export const api = (state = initialState, action: TApiActions) => {
  switch (action.type) {
    case ApiTypes.SET_PROFILE:
      return { ...state, profile: action.payload };
    case ApiTypes.SET_TARIFFS:
      return { ...state, tariffs: action.payload };
    default:
      return { ...state };
  }
};
