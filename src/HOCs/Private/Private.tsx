import React, { useState, useEffect, useRef } from 'react';
import { get } from '@common/fetch';
import { TPage } from '@src/types/routing';
import InnerSetupRedirect from '@components/InnerSetupRedirect';
import lottie from 'lottie-web';
import styles from './styles.module.scss';

function Private<T>(WrappedComponent: React.ComponentType<T>) {
  const Component = ({ ...props }: T) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [redirect, setRedirect] = useState<TPage | null>(null);
    const loaderRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
      if (loading && loaderRef.current !== null) {
        lottie.loadAnimation({
          container: loaderRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '../../../assets/json/loader.json',
        });
      }
    }, [loading]);

    if (redirect) {
      return <InnerSetupRedirect to={redirect} />;
    }

    return loading ? <div ref={loaderRef} className={styles.loader} /> : <WrappedComponent {...props} />;
  };

  return Component;
}

export default Private;
