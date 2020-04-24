import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { AxiosResponse, AxiosError } from 'axios';
import { TPage } from '@src/types/routing';
import { SET_UP_PAGE_PATH } from '@constants/routing';
import { get } from '@common/fetch';
import { IMeSuccessResponse, IMeFailedResponse } from '@src/types/api/me';
import { useToken } from '@hooks/useToken';
import Button from '@components/Button';
import styles from './styles.module.scss';

const StartStep = () => {
  const [redirect, setRedirect] = useState<TPage | null>(null);
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
              setRedirect('/choose-protocol');
            } else {
              setRedirect('/tarrifs');
            }
          }
        })
        .catch((error: AxiosError<IMeFailedResponse>) => {
          if (error.response) {
            if (error.response.data.code !== 401) {
              setRedirect('/choose-cloud');
            }
          }
        });
    }
  }, [token, params]);

  if (redirect !== null) {
    return <Redirect to={`${SET_UP_PAGE_PATH}${redirect}`} />;
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Set up vpn on your server</h2>
      <p className={styles.description}>Online anonymity</p>
      <Button text="Сhoose cloud" href="/login" type="innerLink" />
    </div>
  );
};

export default StartStep;
