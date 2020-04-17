import React, { useRef, useEffect, useCallback } from 'react';
import { AxiosResponse } from 'axios';
import lotie from 'lottie-web';
import { ISuccessMeVpnIdRequest } from '@src/types/api/me-vpn-id';
import { TSetupId, TStep } from '@src/types/reducers/page';
import { useToken } from '@hooks/useToken';
import { get } from '@common/fetch';
import styles from './styles.module.scss';

export interface IStateProps {
  setupId: TSetupId;
}

export interface IActionProps {
  setPageStep: (step: TStep) => void;
}

type TProps = IStateProps & IActionProps;

const ExpectInstallation = ({ setupId, setPageStep }: TProps) => {
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
        }).then((res: AxiosResponse<ISuccessMeVpnIdRequest>) => {
          if (res.data.code === 200) {
            if (res.data.payload.setup_status === 'fgdf') {
              setPageStep('done');
            } else {
              const retryAfter = res.headers['retry-after'] * 1000;
              getSetupStatus(retryAfter);
            }
          }
        });

        // const request = new XMLHttpRequest();
        // request.open('GET', `/me/vpn/${setupId}`);
        // request.setRequestHeader('Content-Type', 'application/json');
        // request.setRequestHeader('Authorization', `Bearer ${token}`);
        // request.send();

        // request.onload = () => {
        //   const headers = request.getAllResponseHeaders();

        //   console.log('headers', headers);
        // };
      }, time);
    },
    [token, setupId, setPageStep],
  );

  useEffect(() => {
    if (loaderRef.current !== null) {
      lotie.loadAnimation({
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
  }, [setupId, getSetupStatus]);

  return (
    <div className={styles.wrapper}>
      <div ref={loaderRef} className={styles.loader} />
      <h2 className={styles.title}>Expect installation</h2>
    </div>
  );
};

export default ExpectInstallation;
