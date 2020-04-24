import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { AxiosResponse, AxiosError } from 'axios';
import lottie from 'lottie-web';
import { TPage } from '@src/types/routing';
import { ISuccessMeVpnIdRequest } from '@src/types/api/me-vpn-id';
import { IResponseError } from '@src/types/api/error';
import { SET_UP_PAGE_PATH } from '@src/constants/routing';
import { TSetupId } from '@src/types/reducers/page';
import { useToken } from '@hooks/useToken';
import { get } from '@common/fetch';
import Private from '@components/Private';
import ExpectInstallationError from './ExpectInstallationError';
import styles from './styles.module.scss';

export interface IStateProps {
  setupId: TSetupId;
}

type TProps = IStateProps;

const ExpectInstallation = ({ setupId }: TProps) => {
  const [redirect, setRedirect] = useState<TPage | null>(null);
  const [tarrifId, setTarrifId] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const token = useToken()[0];

  const getSetupStatus = useCallback(
    (time: number) => {
      setTimeout(() => {
        interface AxiosResponse<T> {
          data: T;
          headers: {
            'retry-after': number;
          };
        }

        get(`/me/vpn/${setupId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res: AxiosResponse<ISuccessMeVpnIdRequest>) => {
            if (res.data.code === 200) {
              setTarrifId(res.data.payload.setup_id);
              if (res.data.payload.setup_status === 'started') {
                setRedirect('/done');
              } else if (res.data.payload.setup_status === 'error') {
                setError(true);
              } else {
                const retryAfter = res.headers['retry-after'] * 1000;
                getSetupStatus(retryAfter);
              }
            }
          })
          .catch((resError: AxiosError<IResponseError>) => {
            if (resError.response) {
              if (resError.response.data.code === 401) {
                setRedirect('/login');
              }
            }
          });
      }, time);
    },
    [token, setupId],
  );

  useEffect(() => {
    if (!error) {
      if (loaderRef.current !== null) {
        lottie.loadAnimation({
          container: loaderRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '../../../assets/json/loader.json',
        });
      }

      if (setupId) {
        getSetupStatus(0);
      }
    }
  }, [setupId, getSetupStatus, error]);

  if (setupId === null) {
    return <Redirect to={`${SET_UP_PAGE_PATH}/choose-protocol`} />;
  }

  if (redirect !== null) {
    return <Redirect to={`${SET_UP_PAGE_PATH}${redirect}`} />;
  }

  return (
    <Private>
      {!error ? (
        <div className={styles.wrapper}>
          <div ref={loaderRef} className={styles.loader} />
          <h2 className={styles.title}>Expect installation</h2>
        </div>
      ) : (
        <ExpectInstallationError setupId={tarrifId} setError={setError} />
      )}
    </Private>
  );
};

export default ExpectInstallation;
