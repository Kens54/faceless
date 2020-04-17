import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@src/store/configStore';
import PageContainer from '@components/PageContainer';
import '../../assets/styles/style.scss';

const App = () => {
  return (
    <Provider store={store}>
      <PageContainer />
    </Provider>
  );
};

export default App;
