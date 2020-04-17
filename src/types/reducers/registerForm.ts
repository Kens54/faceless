export type TFieldValue = string;
export type TInputField = 'full_name' | 'email' | 'password' | 'password2';
export type TErrorValue = string | null;

export interface IRegisterFormState {
  full_name: TFieldValue;
  email: TFieldValue;
  password: TFieldValue;
  password2: TFieldValue;
  sending: boolean;
  error: TErrorValue;
}
