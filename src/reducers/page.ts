import { IPageState } from '@src/types/reducers/page';
import { PageActionTypes } from '@constants/page';
import { TPageActions } from '@src/types/actions/page';

const initialState: IPageState = {
  step: 'plans',
  choosedCloud: 'aws',
  setupId: null,
};

export const page = (state = initialState, action: TPageActions) => {
  switch (action.type) {
    case PageActionTypes.SET_STEP:
      return { ...state, step: action.payload };
    case PageActionTypes.SET_CHOOSED_CLOUD:
      return { ...state, choosedCloud: action.payload };
    case PageActionTypes.SET_SETUP_ID:
      return { ...state, setupId: action.payload };
    default:
      return { ...state };
  }
};
