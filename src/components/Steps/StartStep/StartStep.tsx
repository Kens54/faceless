import React, { useEffect, useState, useRef } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import lottie from 'lottie-web';
import { get } from '@common/fetch';
import { TStep } from '@src/types/reducers/page';
import { IMeSuccessResponse, IMeFailedResponse } from '@src/types/api/me';
import Button from '@components/Button';
import styles from './styles.module.scss';

export interface IActionProps {
  setPageStep: (step: TStep) => void;
}

type TProps = IActionProps;

const StartStep = ({ setPageStep }: TProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    get({
      method: '/me',
      successCallback: (res: AxiosResponse<IMeSuccessResponse>) => {
        const data = res.data.payload;
        if (res.data.code === 200) {
          if (data.payment_type === 'card' && data.expires_in > 0) {
            setPageStep('chooseProtocol');
          } else {
            setPageStep('tarrifs');
          }
        }
      },
      errorCallback: (error: AxiosError<IMeFailedResponse>) => {
        if (error.response) {
          setPageStep('chooseAuth');
        }
      },
      authErrorCallback: () => {
        setLoading(false);
      },
    });
  }, [setPageStep]);

  useEffect(() => {
    if (loading && loaderRef.current !== null) {
      lottie.loadAnimation({
        container: loaderRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '../../../assets/json/loader.json',
      });
    }
  }, [loading]);

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <div ref={loaderRef} className={styles.loader} />
      ) : (
        <>
          <h2 className={styles.title}>Set up vpn on your server</h2>
          <p className={styles.description}>Online anonymity</p>
          <Button text="Choose cloud" onClick={() => setPageStep('login')} />
        </>
      )}
    </div>
  );
};

export default StartStep;
