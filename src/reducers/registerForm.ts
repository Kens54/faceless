import { IRegisterFormState } from '@src/types/reducers/registerForm';
import { RegisterFormTypes } from '@constants/registerForm';
import { TRegisterFormActions } from '@src/types/actions/registerForm';

const initialState: IRegisterFormState = {
  full_name: '',
  email: '',
  password: '',
  password2: '',
  sending: false,
  error: null,
};

export const registerForm = (state = initialState, action: TRegisterFormActions) => {
  switch (action.type) {
    case RegisterFormTypes.SET_INPUT_VALUE:
      return { ...state, [action.payload.field]: action.payload.value };
    case RegisterFormTypes.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return { ...state };
  }
};
