export type TFieldValue = string;
export type TInputField = 'email' | 'password';
export type TErrorValue = string | null;

export interface ILoginFormState {
  email: TFieldValue;
  password: TFieldValue;
  sending: boolean;
  error: TErrorValue;
}
