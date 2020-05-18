import React, { useState, useRef, useEffect, useCallback } from 'react';
import lottie from 'lottie-web';
import { TSetupId } from '@src/types/reducers/page';
import { get } from '@common/fetch';
import { TPage } from '@src/types/routing';
import Private from '@components/Private';
import InnerSetupRedirect from '@src/components/InnerSetupRedirect';
import ExpectInstallationError from './ExpectInstallationError';
import styles from './styles.module.scss';

export interface IStateProps {
  setupId: TSetupId;
}

// export interface IActionProps {
//   setPageStep: (step: TStep) => void;
// }

type TProps = IStateProps;

const ExpectInstallation = ({ setupId }: TProps) => {
  const [redirect, setRedirect] = useState<TPage | null>(null);
  const [tarrifId, setTarrifId] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  // const token = useToken()[0];

  const getSetupStatus = useCallback(
    (time: number) => {
      setTimeout(() => {
        interface AxiosResponse<T> {
          data: T;
          headers: {
            'retry-after': number;
          };
        }

        get({
          method: `/me/vpn/${setupId}`,
          successCallback: res => {
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
          },
          authErrorCallback: () => setRedirect('/login'),
        });
      }, time);
    },
    [setupId],
  );

  useEffect(() => {
    if (!setupId) {
      setRedirect('/choose-protocol');
    }
  }, [setupId]);

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

  if (redirect) {
    return <InnerSetupRedirect to={redirect} />;
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
