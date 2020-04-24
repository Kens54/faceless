import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { get, post } from '@common/fetch';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { useToken } from '@hooks/useToken';
import { ISuccessSetupsResponse } from '@src/types/api/setups';
import { ISuccessSetupPostRequest } from '@src/types/api/setup-post';
import { TPage } from '@src/types/routing';
import { LocalStorageKeys } from '@src/constants/localStorageKeys';
import { TSetupId } from '@src/types/reducers/page';
import { SET_UP_PAGE_PATH } from '@src/constants/routing';
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
}

type TProps = IActionProps;

const ChooseProtocol = ({ setSetupId }: TProps) => {
  const [redirect, setRedirect] = useState<TPage | null>(null);
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
          setRedirect('/expect-installation');
        }
      });
    } else {
      setRedirect('/login');
    }
  };

  if (setups === null) {
    return null;
  }

  if (redirect !== null) {
    return <Redirect to={`${SET_UP_PAGE_PATH}${redirect}`} />;
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
