import React, { useEffect } from 'react';
import { AxiosError } from 'axios';
import { TStep } from '@src/types/reducers/page';
import { useToken } from '@hooks/useToken';
import { get } from '@common/fetch';
import { IResponseError } from '@src/types/api/error';

export interface IActionProps {
  setPageStep: (step: TStep) => void;
}

interface IComponentProps {
  children: React.ReactNode;
}

type TProps = IActionProps & IComponentProps;

const Private = ({ children, setPageStep }: TProps) => {
  const [token, setToken] = useToken();
  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (token) {
      get('/me', params).catch((error: AxiosError<IResponseError>) => {
        if (error.response) {
          if (error.response.data.code === 401) {
            setPageStep('login');
            setToken(null);
          }
        }
      });
    } else {
      setPageStep('login');
      setToken(null);
    }
  }, [token, params, setToken, setPageStep]);

  return <>{children}</>;
};

export default Private;
