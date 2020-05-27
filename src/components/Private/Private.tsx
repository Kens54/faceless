import React, { useState, useEffect } from 'react';
import { get } from '@common/fetch';
import { TPage } from '@src/types/routing';
import InnerSetupRedirect from '../InnerSetupRedirect';

interface IComponentProps {
  children: React.ReactNode;
}

type TProps = IComponentProps;

const Private = ({ children }: TProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [redirect, setRedirect] = useState<TPage | null>(null);
  useEffect(() => {
    get({
      method: '/me',
      authErrorCallback: () => {
        setRedirect('/login');
      },
      finallyCallback: () => {
        setLoading(false);
      },
    });
  }, []);

  if (loading) {
    return null;
  }

  if (redirect) {
    return <InnerSetupRedirect to={redirect} />;
  }

  return <>{children}</>;
};

export default Private;
