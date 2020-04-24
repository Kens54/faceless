import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IStoreState } from '@src/types/store';
import { TFieldValue, TInputField, TErrorValue } from '@src/types/reducers/registerForm';
import { setInputValue, setFieldError, setSending } from '@actions/registerForm';
import RegisterForm, { IStateProps, IActionProps } from './RegisterForm';

const mapStateToProps = (state: IStoreState): IStateProps => ({
  full_name: state.registerForm.full_name,
  email: state.registerForm.email,
  password: state.registerForm.password,
  password2: state.registerForm.password2,
  sending: state.registerForm.sending,
  error: state.registerForm.error,
});

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
  onChangeInputValue: (field: TInputField, value: TFieldValue) => dispatch(setInputValue(field, value)),
  setError: (value: TErrorValue) => dispatch(setFieldError(value)),
  setSending: (value: boolean) => dispatch(setSending(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
