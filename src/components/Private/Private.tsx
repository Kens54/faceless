import React, { useEffect } from 'react';
import { TStep } from '@src/types/reducers/page';
import { get } from '@common/fetch';

export interface IActionProps {
  setPageStep: (step: TStep) => void;
}

interface IComponentProps {
  children: React.ReactNode;
}

type TProps = IActionProps & IComponentProps;

const Private = ({ children, setPageStep }: TProps) => {
  useEffect(() => {
    get({ method: '/me', authErrorCallback: () => setPageStep('login') });
  }, [setPageStep]);

  return <>{children}</>;
};

export default Private;
