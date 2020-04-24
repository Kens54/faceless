import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { post } from '@src/common/fetch';
import { TSetupId } from '@src/types/reducers/page';
import { TPage } from '@src/types/routing';
import { useToken } from '@src/hooks/useToken';
import { LocalStorageKeys } from '@src/constants/localStorageKeys';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { AxiosResponse } from 'axios';
import { ISuccessSetupPostRequest } from '@src/types/api/setup-post';
import { SET_UP_PAGE_PATH } from '@src/constants/routing';
import Button from '@components/Button';
import styles from '../styles.module.scss';

interface IComponentProps {
  setupId: TSetupId;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

type TProps = IComponentProps;

const ExpectInstallationError = ({ setupId, setError }: TProps) => {
  const [redirect, setRedirect] = useState<TPage | null>(null);
  const token = useToken()[0];
  const useOurResources = useLocalStorage(LocalStorageKeys.USE_OUR_RESOURCES, true)[0];
  const credentionals = useLocalStorage(LocalStorageKeys.CREDENTIONALS, null)[0];

  const handleSetup = () => {
    if (token) {
      const getParams = () => {
        if (useOurResources === false && credentionals !== null) {
          return {
            credentials: credentionals,
            setup_id: setupId,
            used_our_resourses: false,
          };
        }

        return { setup_id: setupId, used_our_resourses: true };
      };

      post('/vpn/setup', getParams(), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((res: AxiosResponse<ISuccessSetupPostRequest>) => {
        if (res.data.code === 200) {
          setError(false);
        }
      });
    } else {
      setRedirect('/login');
    }
  };

  if (redirect !== null) {
    return <Redirect to={`${SET_UP_PAGE_PATH}${redirect}`} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.loader} ${styles['loader--image']}`} />
      <h2 className={styles.title}>Something went wrong...</h2>
      <div className={styles['button-container']}>
        <Button
          text={
            <div className={styles['button-content']}>
              <div className={styles['retry-icon']} />
              Retry
            </div>
          }
          onClick={handleSetup}
        />
      </div>
      <a className={styles['support-link']} href="/contacts">
        Contact support
      </a>
    </div>
  );
};

export default ExpectInstallationError;
