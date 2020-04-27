import React, { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { get, post } from '@common/fetch';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { useToken } from '@hooks/useToken';
import { ISuccessSetupsResponse } from '@src/types/api/setups';
import { ISuccessSetupPostRequest } from '@src/types/api/setup-post';
import { LocalStorageKeys } from '@src/constants/localStorageKeys';
import { TSetupId, TStep } from '@src/types/reducers/page';
import Button from '@components/Button';
import Private from '@components/Private';
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
  setPageStep: (step: TStep) => void;
}

type TProps = IActionProps;

const ChooseProtocol = ({ setSetupId, setPageStep }: TProps) => {
  const token = useToken()[0];
  const useOurResources = useLocalStorage(LocalStorageKeys.USE_OUR_RESOURCES, true)[0];
  const credentionals = useLocalStorage(LocalStorageKeys.CREDENTIONALS, null)[0];
  const [setups, setSetups] = useState<TSetups | null>(null);

  useEffect(() => {
    get('/vpn/setups', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res: AxiosResponse<ISuccessSetupsResponse>) => {
      if (res.data.code === 200) {
        setSetups(res.data.payload);
      }
    });
  }, [token]);

  const handleChooseProtocol = (id: number) => {
    if (token) {
      const getParams = () => {
        if (useOurResources === false && credentionals !== null) {
          return {
            credentials: credentionals,
            setup_id: id,
            used_our_resourses: false,
          };
        }

        return { setup_id: id, used_our_resourses: true };
      };

      post('/vpn/setup', getParams(), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((res: AxiosResponse<ISuccessSetupPostRequest>) => {
        if (res.data.code === 200) {
          setSetupId(res.data.payload.id);
          setPageStep("expectInstallation");
        }
      });
    } else {
      setPageStep("login");
    }
  };

  if (setups === null) {
    return null;
  }

  return (
    <Private>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Choose protocol</h2>
        <ul className={styles['buttons-block']}>
          {setups.map(item => (
            <li className={styles['button-container']} key={item.id}>
              <Button
                text={item.name}
                style={{ textTransform: 'none' }}
                onClick={() => handleChooseProtocol(item.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </Private>
  );
};

export default ChooseProtocol;
