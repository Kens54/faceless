import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { AxiosResponse, AxiosError } from 'axios';
import { TPage } from '@src/types/routing';
import { TFieldValue, TErrorValue, TInputField } from '@src/types/reducers/registerForm';
import { IRegisterSuccessResponse, IRegisterFailedResponse } from '@src/types/api/register';
import { SET_UP_PAGE_PATH } from '@src/constants/routing';
import {
  // get,
  post,
} from '@common/fetch';
import { useToken } from '@hooks/useToken';
import Input from '@components/Input';
import Button from '@components/Button';
import styles from '@components/Form/styles.module.scss';

export interface IStateProps {
  full_name: TFieldValue;
  email: TFieldValue;
  password: TFieldValue;
  password2: TFieldValue;
  sending: boolean;
  error: TErrorValue;
}

export interface IActionProps {
  onChangeInputValue: (field: TInputField, value: TFieldValue) => void;
  setError: (value: TErrorValue) => void;
  setSending: (value: boolean) => void;
}

type IProps = IStateProps & IActionProps;

interface IValidation {
  [key: string]: {
    regexp: RegExp;
  };
}

const RegisterForm = ({
  full_name,
  email,
  password,
  password2,
  // sending,
  error,
  onChangeInputValue,
  setError,
  setSending,
}: IProps) => {
  const [redirect, setRedirect] = useState<TPage | null>(null);
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

    if (password !== password2) {
      setError('Passwords entered do not match');
      setSending(false);
      return;
    }

    if (!validation.email.regexp.test(email)) {
      setError('Password must be 6 symbols');
      setSending(false);
      return;
    }

    post('/register', {
      full_name,
      email,
      password,
    })
      .then((res: AxiosResponse<IRegisterSuccessResponse>) => {
        setSending(false);

        if (res.data.code === 200) {
          setToken(res.data.payload.token);
          setRedirect('/choose-cloud');

          return res.data.payload.token;
        }

        return null;
      })
      .catch((resError: AxiosError<IRegisterFailedResponse>) => {
        if (resError.response) {
          setError(resError.response.data.message);
        } else if (resError.message) {
          setError(resError.message);
        }

        setToken(null);
      });
  };

  if (redirect !== null) {
    return <Redirect to={`${SET_UP_PAGE_PATH}${redirect}`} />;
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Register</h2>
      <p className={styles.description}>Register to start the installation wizard</p>
      <div className={styles.form}>
        <div className={styles['input-container']}>
          <Input
            inputName="Full name"
            id="full-name"
            type="string"
            value={full_name}
            onChange={value => {
              handleInputChange('full_name', value);
            }}
          />
        </div>
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
        <div className={styles['input-container']}>
          <Input
            inputName="Repeat password"
            id="register-password2"
            type="password"
            value={password2}
            onChange={value => {
              handleInputChange('password2', value);
            }}
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles['button-container']}>
          <Button text="next" onClick={handleSubmit} disabled={!full_name || !email || !password || !password2} />
        </div>
        <Link className={styles['other-forms-link']} to={`${SET_UP_PAGE_PATH}/login`}>
          Have an account? Sign in
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
