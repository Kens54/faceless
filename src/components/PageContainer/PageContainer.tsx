import React from 'react';
import { getSearchParameter } from '@common/getSearchParameter';
import StartStep from '@components/Steps/StartStep';
import LoginForm from '@components/Steps/LoginForm';
import RegisterForm from '@components/Steps/RegisterForm';
import CloudsStep from '@components/Steps/CloudsStep';
import ChooseAuth from '@components/Steps/ChooseAuth';
import AWSCredentionals from '@components/Steps/AWSCredentionals';
import Plans from '@components/Steps/Plans';
import ChooseProtocol from '@components/Steps/ChooseProtocol';
import ExpectInstallation from '@components/Steps/ExpectInstallation';
import Done from '@components/Steps/Done';
import { TStep } from '@src/types/reducers/page';

export interface IStateProps {
  step: TStep;
}

type TProps = IStateProps;

const PageContainer = ({ step }: TProps) => {
  let pageStep = step;
  const isBillingError = getSearchParameter('billing-error');

  if (step === 'start' && window.location.hash === '#tarrifs') {
    pageStep = 'tarrifs';
  } else if (step === 'start' && isBillingError === 'true') {
    pageStep = 'chooseAuthError';
  }

  switch (pageStep) {
    case 'start':
      return <StartStep />;
    case 'login':
      return <LoginForm />;
    case 'register':
      return <RegisterForm />;
    case 'chooseCloud':
      return <CloudsStep />;
    case 'chooseAuth':
      return <ChooseAuth />;
    case 'chooseAuthError':
      return <ChooseAuth error />;
    case 'awsCredentials':
      return <AWSCredentionals />;
    case 'tarrifs':
      return <Plans />;
    case 'chooseProtocol':
      return <ChooseProtocol />;
    case 'expectInstallation':
      return <ExpectInstallation />;
    case 'done':
      return <Done />;
    default:
      return <StartStep />;
  }
};

export default PageContainer;
