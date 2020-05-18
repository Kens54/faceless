import React from 'react';
// import { getSearchParameter } from '@common/getSearchParameter';
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
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const PageContainer = () => {
  // let pageStep = step;
  // const isBillingError = getSearchParameter('billing-error');

  // if (step === 'start' && window.location.hash === '#tarrifs') {
  //   pageStep = 'tarrifs';
  // } else if (step === 'start' && isBillingError === 'true') {
  //   pageStep = 'chooseAuthError';
  // }

  // switch (pageStep) {
  //   case 'start':
  //     return <StartStep />;
  //   case 'login':
  //     return <LoginForm />;
  //   case 'register':
  //     return <RegisterForm />;
  //   case 'chooseCloud':
  //     return <CloudsStep />;
  //   case 'chooseAuth':
  //     return <ChooseAuth />;
  //   case 'chooseAuthError':
  //     return <ChooseAuth error />;
  //   case 'awsCredentials':
  //     return <AWSCredentionals />;
  //   case 'tarrifs':
  //     return <Plans />;
  //   case 'chooseProtocol':
  //     return <ChooseProtocol />;
  //   case 'expectInstallation':
  //     return <ExpectInstallation />;
  //   case 'done':
  //     return <Done />;
  //   default:
  //     return <StartStep />;
  // }

  return (
    <Router>
      <Switch>
        <Route path="/set-up" exact>
          <StartStep />
        </Route>
        <Route path="/set-up/login">
          <LoginForm />
        </Route>
        <Route path="/set-up/register">
          <RegisterForm />
        </Route>
        <Route path="/set-up/choose-cloud">
          <CloudsStep />
        </Route>
        <Route path="/set-up/choose-auth">
          <ChooseAuth />
        </Route>
        <Route path="/set-up/choose-auth-error">
          <ChooseAuth error />
        </Route>
        <Route path="/set-up/aws-credentials">
          <AWSCredentionals />
        </Route>
        <Route path="/set-up/tarrifs">
          <Plans />
        </Route>
        <Route path="/set-up/choose-protocol">
          <ChooseProtocol />
        </Route>
        <Route path="/set-up/expect-installation">
          <ExpectInstallation />
        </Route>
        <Route path="/set-up/done">
          <Done />
        </Route>
      </Switch>
    </Router>
  );
};

export default PageContainer;
