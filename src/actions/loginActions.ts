import { LoginFormTypes } from '@constants/loginForm';
import { ISetInputValue, ISetError, ISetSending } from '@src/types/actions/loginForm';
import { TFieldValue, TErrorValue, TInputField } from '@src/types/reducers/loginForm';

export const setInputValue = (field: TInputField, value: TFieldValue): ISetInputValue => ({
  type: LoginFormTypes.SET_INPUT_VALUE,
  payload: {
    field,
    value,
  },
});

export const setFieldError = (value: TErrorValue): ISetError => ({
  type: LoginFormTypes.SET_ERROR,
  payload: value,
});

export const setSending = (value: boolean): ISetSending => ({
  type: LoginFormTypes.SET_SENDING,
  payload: value,
});
