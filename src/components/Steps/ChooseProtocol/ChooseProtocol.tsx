import React, { useState, useLayoutEffect } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import { get, post } from '@common/fetch';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { ISuccessSetupsResponse } from '@src/types/api/setups';
import { ISuccessSetupPostRequest } from '@src/types/api/setup-post';
import { IResponseError } from '@src/types/api/error';
import { LocalStorageKeys } from '@src/constants/localStorageKeys';
import { TSetupId } from '@src/types/reducers/page';
import { TPage } from '@src/types/routing';
import Button from '@components/Button';
import InnerSetupRedirect from '@src/components/InnerSetupRedirect';
import styles from './styles.module.scss';

interface ISetup {
  cloud: string;
  description: string;
  id: number;
  name: string;
}

type TSetups = ISetup[];

export interface IActionProps {
  setSetupId: (id: TSetupId) => void;
  // setPageStep: (step: TStep) => void;
}

type TProps = IActionProps;

const ChooseProtocol = ({ setSetupId }: TProps) => {
  const [redirect, setRedirect] = useState<TPage | null>(null);
  const useOurResources = useLocalStorage(LocalStorageKeys.USE_OUR_RESOURCES, true)[0];
  const credentials = useLocalStorage(LocalStorageKeys.CREDENTIONALS, null)[0];
  const [setups, setSetups] = useState<TSetups>([]);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    get({
      method: '/vpn/setups',
      successCallback: (res: AxiosResponse<ISuccessSetupsResponse>) => {
        if (res.data.code === 200) {
          setSetups(res.data.payload);
        }
      },
    });
  }, []);

  const handleChooseProtocol = (id: number) => {
    const getParams = () => {
      if (useOurResources === false && credentials !== null) {
        return {
          credentials,
          setup_id: id,
          used_our_resources: false,
        };
      }

      return { setup_id: id, used_our_resources: true };
    };

    post({
      method: '/vpn/setup',
      options: getParams(),
      successCallback: (res: AxiosResponse<ISuccessSetupPostRequest>) => {
        if (res.data.code === 200) {
          setSetupId(res.data.payload.id);
          setRedirect('/expect-installation');
        }
      },
      authErrorCallback: () => {
        setRedirect('/login');
      },
      errorCallback: (res: AxiosError<IResponseError>) => {
        if (res.response) {
          setError(res.response.data.message);
        } else if (res.message) {
          setError(res.message);
        }
      },
    });
  };

  if (redirect) {
    return <InnerSetupRedirect to={redirect} />;
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Choose protocol</h2>
      <ul className={styles['buttons-block']}>
        {setups.map(item => (
          <li className={styles['button-container']} key={item.id}>
            <Button
              text="Start setup"
              style={{ textTransform: 'none' }}
              onClick={() => handleChooseProtocol(item.id)}
            />
          </li>
        ))}
      </ul>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default ChooseProtocol;
