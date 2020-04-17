import { RegisterFormTypes } from '@constants/registerForm';
import { TFieldValue, TErrorValue, TInputField } from '@src/types/reducers/registerForm';

export type TRegisterFormActions = ISetInputValue | ISetError | ISetSending;

export interface ISetInputValue {
  type: RegisterFormTypes.SET_INPUT_VALUE;
  payload: {
    field: TInputField;
    value: TFieldValue;
  };
}

export interface ISetError {
  type: RegisterFormTypes.SET_ERROR;
  payload: TErrorValue;
}

export interface ISetSending {
  type: RegisterFormTypes.SET_SENDING;
  payload: boolean;
}
