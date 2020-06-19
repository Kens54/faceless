import React, { useState } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import { TFieldValue, TErrorValue, TInputField } from '@src/types/reducers/loginForm';
import { TPage } from '@src/types/routing';
import { TServerType } from '@src/types/reducers/page';
import { IRegisterSuccessResponse } from '@src/types/api/register';
import { IResponseError } from '@src/types/api/error';
import { IMeSuccessResponse } from '@src/types/api/me';
import { ISuccessMeVpnsRequest } from '@src/types/api/me-vpns';
import { post, get } from '@common/fetch';
import { useToken } from '@hooks/useToken';
import InnerSetupRedirect from '@components/InnerSetupRedirect';
import Input from '@components/Input';
import Button from '@components/Button';
import styles from '@components/Form/styles.module.scss';

export interface IStateProps {
  email: TFieldValue;
  password: TFieldValue;
  sending: boolean;
  error: TErrorValue;
  serverType: TServerType;
}

export interface IActionProps {
  onChangeInputValue: (field: TInputField, value: TFieldValue) => void;
  setError: (value: TErrorValue) => void;
  setSending: (value: boolean) => void;
  // setPageStep: (step: TStep) => void;
}

type IProps = IStateProps & IActionProps;

interface IValidation {
  [key: string]: {
    regexp: RegExp;
  };
}

const LoginForm = ({ email, password, error, serverType, onChangeInputValue, setError, setSending }: IProps) => {
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

  const getMe = () => {
    get({
      method: '/me',
      successCallback: (meRes: AxiosResponse<IMeSuccessResponse>) => {
        if (meRes.data.code === 200) {
          if (meRes.data.payload.payment_type === 'card') {
            setRedirect('/choose-protocol');
          } else if (serverType === 'faceless') {
            setRedirect('/tariffs');
          } else {
            setRedirect('/choose-cloud');
          }
        }
      },
    });
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

          get({
            method: '/me/vpns',
            successCallback: (vpnsRes: AxiosResponse<ISuccessMeVpnsRequest>) => {
              const list = vpnsRes.data.payload;
              let isRedirected = false;

              list.every(item => {
                if (item.setup_status === 'started') {
                  setRedirect('/instructions');
                  isRedirected = true;
                  return false;
                }
                return true;
              });

              if (!isRedirected) {
                getMe();
              }
            },
          });
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

  if (redirect) {
    return <InnerSetupRedirect to={redirect} />;
  }

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
          type="innerLink"
          text="Not registered yet? Sign up"
          className={styles['other-forms-link']}
          href="/register"
        />
      </div>
    </div>
  );
};

export default LoginForm;
