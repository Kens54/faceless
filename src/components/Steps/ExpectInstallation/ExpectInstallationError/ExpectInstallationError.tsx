import React from 'react';
import { post } from '@src/common/fetch';
import { TSetupId } from '@src/types/reducers/page';
import { LocalStorageKeys } from '@src/constants/localStorageKeys';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { AxiosResponse } from 'axios';
import { ISuccessSetupPostRequest } from '@src/types/api/setup-post';
import Button from '@components/Button';
import styles from '../styles.module.scss';

interface IComponentProps {
  setupId: TSetupId;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

type TProps = IComponentProps;

const ExpectInstallationError = ({ setupId, setError }: TProps) => {
  const useOurResources = useLocalStorage(LocalStorageKeys.USE_OUR_RESOURCES, true)[0];
  const credentionals = useLocalStorage(LocalStorageKeys.CREDENTIONALS, null)[0];

  const handleSetup = () => {
    const getParams = () => {
      if (useOurResources === false && credentionals !== null) {
        return {
          credentials: credentionals,
          setup_id: setupId,
          used_our_resources: false,
        };
      }

      return { setup_id: setupId, used_our_resources: true };
    };

    post({
      method: '/vpn/setup',
      options: getParams(),
      successCallback: (res: AxiosResponse<ISuccessSetupPostRequest>) => {
        if (res.data.code === 200) {
          setError(false);
        }
      },
    });
  };

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
