import React from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import { TFieldValue, TErrorValue, TInputField } from '@src/types/reducers/loginForm';
import { IRegisterSuccessResponse } from '@src/types/api/register';
import { IResponseError } from '@src/types/api/error';
import { post } from '@common/fetch';
import { useToken } from '@hooks/useToken';
import Input from '@components/Input';
import Button from '@components/Button';
import { TProfilePageStep } from '@src/types/reducers/profilePage';
import styles from '@components/Form/styles.module.scss';

export interface IStateProps {
  email: TFieldValue;
  password: TFieldValue;
  sending: boolean;
  error: TErrorValue;
}

export interface IActionProps {
  onChangeInputValue: (field: TInputField, value: TFieldValue) => void;
  setError: (value: TErrorValue) => void;
  setSending: (value: boolean) => void;
  setProfilePageStep: (step: TProfilePageStep) => void;
}

type IProps = IStateProps & IActionProps;

interface IValidation {
  [key: string]: {
    regexp: RegExp;
  };
}

const LoginForm = ({
  email,
  password,
  error,
  onChangeInputValue,
  setError,
  setSending,
  setProfilePageStep,
}: IProps) => {
  const setToken = useToken()[1];

  const validation: IValidation = {
    email: {
      regexp: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    },
    password: {
      regexp: /.{6}/,
    },
  };

  const handleInputChange = (field: TInputField, value: string) => {
    setError(null);
    onChangeInputValue(field, value);
  };

  const handleSubmit = () => {
    setSending(true);

    if (!validation.email.regexp.test(email)) {
      setError('Invalid Email');
      setSending(false);
      return;
    }

    if (!validation.email.regexp.test(email)) {
      setError('Password must be 6 symbols');
      setSending(false);
      return;
    }

    post({
      method: '/login',
      options: { email, password },
      successCallback: (res: AxiosResponse<IRegisterSuccessResponse>) => {
        setSending(false);

        if (res.data.code === 200) {
          const { token } = res.data.payload;
          setToken(token);
          setProfilePageStep('profile');
        }
      },
      authErrorCallback: (res: AxiosError<IResponseError>) => {
        if (res.response) {
          setError(res.response.data.message);
        } else if (res.message) {
          setError(res.message);
        }

        setToken(null);
      },
      errorCallback: (res: AxiosError<IResponseError>) => {
        if (res.response) {
          setError(res.response.data.message);
        } else if (res.message) {
          setError(res.message);
        }

        setToken(null);
      },
    });
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Sign in</h2>
      <div className={styles.form}>
        <div className={styles['input-container']}>
          <Input
            inputName="Email"
            id="register-email"
            type="email"
            value={email}
            onChange={value => {
              handleInputChange('email', value);
            }}
          />
        </div>
        <div className={styles['input-container']}>
          <Input
            inputName="Password"
            id="register-password"
            type="password"
            value={password}
            onChange={value => {
              handleInputChange('password', value);
            }}
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles['button-container']}>
          <Button text="next" onClick={handleSubmit} disabled={!email || !password} />
        </div>
        <Button
          type="button"
          text="Not registered yet? Sign up"
          className={styles['other-forms-link']}
          onClick={() => setProfilePageStep('register')}
        />
      </div>
    </div>
  );
};

export default LoginForm;
