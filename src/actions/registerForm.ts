import { RegisterFormTypes } from '@constants/registerForm';
import { ISetInputValue, ISetError, ISetSending } from '@src/types/actions/registerForm';
import { TFieldValue, TErrorValue, TInputField } from '@src/types/reducers/registerForm';

export const setInputValue = (field: TInputField, value: TFieldValue): ISetInputValue => ({
  type: RegisterFormTypes.SET_INPUT_VALUE,
  payload: {
    field,
    value,
  },
});

export const setFieldError = (value: TErrorValue): ISetError => ({
  type: RegisterFormTypes.SET_ERROR,
  payload: value,
});

export const setSending = (value: boolean): ISetSending => ({
  type: RegisterFormTypes.SET_SENDING,
  payload: value,
});
