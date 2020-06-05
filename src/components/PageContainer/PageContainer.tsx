import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StartStep from '@components/Steps/StartStep';
import LoginForm from '@components/Steps/LoginForm';
import RegisterForm from '@components/Steps/RegisterForm';
// import CloudsStep from '@components/Steps/CloudsStep';
// import ChooseAuth from '@components/Steps/ChooseAuth';
import AWSCredentionals from '@components/Steps/AWSCredentionals';
import Plans from '@components/Steps/Plans';
import ChooseProtocol from '@components/Steps/ChooseProtocol';
import ExpectInstallation from '@components/Steps/ExpectInstallation';
import Done from '@components/Steps/Done';
import InstructionsStep from '../Steps/InstructionsStep';

const PageContainer = () => {
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
        {/* <Route path="/set-up/choose-cloud">
          <CloudsStep />
        </Route> */}
        {/* <Route path="/set-up/choose-auth">
          <ChooseAuth />
        </Route> */}
        <Route path="/set-up/aws-credentials">
          <AWSCredentionals />
        </Route>
        <Route path="/set-up/tariffs">
          <Plans />
        </Route>
        <Route path="/set-up/tariffs-error">
          <Plans error />
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
        <Route path="/set-up/instructions">
          <InstructionsStep />
        </Route>
      </Switch>
    </Router>
  );
};

export default PageContainer;
