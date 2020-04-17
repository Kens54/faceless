import React from 'react';
import { TStep } from '@src/types/reducers/page';
import StartStep from '@components/Steps/StartStep';
import CloudsStep from '@components/Steps/CloudsStep';
import ChooseAuth from '@components/Steps/ChooseAuth';
import RegisterForm from '@components/Steps/RegisterForm';
import LoginForm from '@components/Steps/LoginForm';
import Plans from '@components/Steps/Plans';
import ChooseProtocol from '@components/Steps/ChooseProtocol';
import ExpectInstallation from '@components/Steps/ExpectInstallation';
import Done from '@components/Steps/Done';
import styles from './styles.module.scss';

export interface IStateProps {
  step: TStep;
}

type TProps = IStateProps;

const PageContainer = ({ step }: TProps) => {
  const Step = () => {
    switch (step) {
      case 'start':
        return <StartStep />;
      case 'clouds':
        return <CloudsStep />;
      case 'chooseAuth':
        return <ChooseAuth />;
      case 'register':
        return <RegisterForm />;
      case 'login':
        return <LoginForm />;
      case 'plans':
        return <Plans />;
      case 'chooseProtocol':
        return <ChooseProtocol />;
      case 'expect-installation':
        return <ExpectInstallation />;
      case 'done':
        return <Done />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.wrapper}>
      <Step />
    </div>
  );
};

export default PageContainer;
