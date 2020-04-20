import React, { useEffect } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import { get } from '@common/fetch';
import { TStep } from '@src/types/reducers/page';
import { TProfileDataState } from '@src/types/reducers/api';
import { IMeSuccessResponse, IMeFailedResponse } from '@src/types/api/me';
import { useToken } from '@hooks/useToken';
import Button from '@components/Button';
import styles from './styles.module.scss';

export interface IActionProps {
  setPageStep: (step: TStep) => void;
  setProfileData: (value: TProfileDataState) => void;
}

type TProps = IActionProps;

const StartStep = ({ setPageStep }: TProps) => {
  const token = useToken()[0];
  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (token) {
      get('/me', params)
        .then((res: AxiosResponse<IMeSuccessResponse>) => {
          const data = res.data.payload;
          if (res.data.code === 200) {
            if (data.payment_type === 'card' && data.expires_in > 0) {
              setPageStep('chooseProtocol');
            } else {
              setPageStep('plans');
            }
          }
        })
        .catch((error: AxiosError<IMeFailedResponse>) => {
          if (error.response) {
            if (error.response.data.code !== 401) {
              setPageStep('clouds');
            }
          }
        });
    }
  }, [token, params, setPageStep]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Set up vpn on your server</h2>
      <p className={styles.description}>Online anonymity</p>
      <Button text="Сhoose cloud" onClick={() => setPageStep('login')} />
    </div>
  );
};

export default StartStep;
