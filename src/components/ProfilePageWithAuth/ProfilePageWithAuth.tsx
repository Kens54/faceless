import React, { useState, useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { get } from '@common/fetch';
import { TProfilePageStep } from '@src/types/reducers/profilePage';
import ProfilePage from '@components/ProfilePage';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import styles from './styles.module.scss';

export interface IStateProps {
  step: TProfilePageStep;
}

export interface IActionProps {
  setProfilePageStep: (step: TProfilePageStep) => void;
}

type TProps = IStateProps & IActionProps;

interface IPageContent {
  step: TProfilePageStep;
}

const PageContent = ({ step }: IPageContent) => {
  switch (step) {
    case 'login':
      return <LoginForm />;
    case 'register':
      return <RegisterForm />;
    case 'profile':
      return <ProfilePage />;
    default:
      return null;
  }
};

const ProfilePageWithAuth = ({ step, setProfilePageStep }: TProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    get({
      method: '/me',
      authErrorCallback: () => {
        setProfilePageStep('login');
      },
      finallyCallback: () => {
        setLoading(false);
      },
    });
  }, [setProfilePageStep]);

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

  return loading ? <div ref={loaderRef} className={styles.loader} /> : <PageContent step={step} />;
};

export default ProfilePageWithAuth;
