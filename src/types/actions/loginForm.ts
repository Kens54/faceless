import { LoginFormTypes } from '@constants/loginForm';
import { TFieldValue, TErrorValue, TInputField } from '@src/types/reducers/loginForm';

export type TLoginFormActions = ISetInputValue | ISetError | ISetSending;

export interface ISetInputValue {
  type: LoginFormTypes.SET_INPUT_VALUE;
  payload: {
    field: TInputField;
    value: TFieldValue;
  };
}

export interface ISetError {
  type: LoginFormTypes.SET_ERROR;
  payload: TErrorValue;
}

export interface ISetSending {
  type: LoginFormTypes.SET_SENDING;
  payload: boolean;
}
