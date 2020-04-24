import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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

const PageContainer = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <StartStep />
      </Route>
      <Route path="/login">
        <LoginForm />
      </Route>
      <Route path="/register">
        <RegisterForm />
      </Route>
      <Route path="/choose-cloud">
        <CloudsStep />
      </Route>
      <Route path="/choose-auth">
        <ChooseAuth />
      </Route>
      <Route path="/aws-credentials">
        <AWSCredentionals />
      </Route>
      <Route path="/tarrifs">
        <Plans />
      </Route>
      <Route path="/choose-protocol">
        <ChooseProtocol />
      </Route>
      <Route path="/expect-installation">
        <ExpectInstallation />
      </Route>
      <Route path="/done">
        <Done />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default PageContainer;
