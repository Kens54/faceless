import React from 'react';
import { AxiosResponse } from 'axios';
import { TFieldValue, TErrorValue, TInputField } from '@src/types/reducers/loginForm';
import { IRegisterSuccessResponse } from '@src/types/api/register';
import { IMeSuccessResponse } from '@src/types/api/me';
import { get, post } from '@common/fetch';
import { useToken } from '@hooks/useToken';
import Input from '@components/Input';
import Button from '@components/Button';
import { TStep } from '@src/types/reducers/page';
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
  setPageStep: (step: TStep) => void;
}

type IProps = IStateProps & IActionProps;

interface IValidation {
  [key: string]: {
    regexp: RegExp;
  };
}

const LoginForm = ({ email, password, error, onChangeInputValue, setError, setSending, setPageStep }: IProps) => {
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

    post('/login', {
      email,
      password,
    })
      .then((res: AxiosResponse<IRegisterSuccessResponse>) => {
        setSending(false);

        if (res.data.code === 200) {
          const { token } = res.data.payload;
          setToken(token);

          get('/me', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }).then((meRes: AxiosResponse<IMeSuccessResponse>) => {
            if (meRes.data.code === 200) {
              if (meRes.data.payload.payment_type === 'card') {
                setPageStep('chooseProtocol');
              } else {
                setPageStep('clouds');
              }
            }
          });

          return res.data.payload.token;
        }

        return null;
      })
      .catch(() => {
        setToken(null);
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
        <button type="button" className={styles['other-forms-link']} onClick={() => setPageStep('register')}>
          Not registered yet? Sign up
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
