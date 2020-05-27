import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IStoreState } from '@src/types/store';
import { TFieldValue, TInputField, TErrorValue } from '@src/types/reducers/registerForm';
import { setInputValue, setFieldError, setSending } from '@actions/registerForm';
import { TProfilePageStep } from '@src/types/reducers/profilePage';
import { setProfilePageStep } from '@src/actions/profilePage';
import LoginForm, { IStateProps, IActionProps } from './LoginForm';

const mapStateToProps = (state: IStoreState): IStateProps => ({
  email: state.registerForm.email,
  password: state.registerForm.password,
  sending: state.registerForm.sending,
  error: state.registerForm.error,
});

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => ({
  onChangeInputValue: (field: TInputField, value: TFieldValue) => dispatch(setInputValue(field, value)),
  setError: (value: TErrorValue) => dispatch(setFieldError(value)),
  setSending: (value: boolean) => dispatch(setSending(value)),
  setProfilePageStep: (step: TProfilePageStep) => dispatch(setProfilePageStep(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
