import { ILoginFormState } from '@src/types/reducers/loginForm';
import { LoginFormTypes } from '@constants/loginForm';
import { TLoginFormActions } from '@src/types/actions/loginForm';

const initialState: ILoginFormState = {
  email: '',
  password: '',
  sending: false,
  error: null,
};

export const loginForm = (state = initialState, action: TLoginFormActions) => {
  switch (action.type) {
    case LoginFormTypes.SET_INPUT_VALUE:
      return { ...state, [action.payload.field]: action.payload.value };
    case LoginFormTypes.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return { ...state };
  }
};
