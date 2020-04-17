import React, { useState, useEffect } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import { get, post } from '@common/fetch';
import { useToken } from '@hooks/useToken';
import { ISuccessSetupsResponse } from '@src/types/api/setups';
import { ISuccessSetupPostRequest } from '@src/types/api/setup-post';
import { IResponseError } from '@src/types/api/error';
import { TStep, TSetupId } from '@src/types/reducers/page';
import Button from '@components/Button';
import styles from './styles.module.scss';

interface ISetup {
  cloud: string;
  description: string;
  id: number;
  name: string;
}

type TSetups = ISetup[];

export interface IActionProps {
  setPageStep: (step: TStep) => void;
  setSetupId: (id: TSetupId) => void;
}

type TProps = IActionProps;

const ChooseProtocol = ({ setPageStep, setSetupId }: TProps) => {
  const token = useToken()[0];
  const [setups, setSetups] = useState<TSetups | null>(null);

  useEffect(() => {
    get('/vpn/setups', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res: AxiosResponse<ISuccessSetupsResponse>) => {
        if (res.data.code === 200) {
          setSetups(res.data.payload);
        }
      })
      .catch((error: AxiosError<IResponseError>) => {
        if (error.response) {
          if (error.response.data.code === 401) {
            setPageStep('login');
          }
        }
      });
  }, [token, setPageStep]);

  const handleChooseCrotocol = (id: number) => {
    if (token) {
      post(
        '/vpn/setup',
        { setup_id: id, used_our_resourses: true },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      ).then((res: AxiosResponse<ISuccessSetupPostRequest>) => {
        if (res.data.code === 200) {
          setSetupId(res.data.payload.id);
          setPageStep('expect-installation');
        }
      });
    }
  };

  if (setups === null) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Choose protocol</h2>
      <ul className={styles['buttons-block']}>
        {setups.map(item => (
          <li className={styles['button-container']} key={item.id}>
            <Button text={item.name} style={{ textTransform: 'none' }} onClick={() => handleChooseCrotocol(item.id)} />
          </li>
        ))}
        {/* <li className={styles['button-container']}>
          <Button text="OpenVPN" style={{ textTransform: 'none' }} />
        </li>
        <li className={styles['button-container']}>
          <Button text="WireGuard" style={{ textTransform: 'none' }} />
        </li> */}
      </ul>
    </div>
  );
};

export default ChooseProtocol;
