import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@src/store/configStore';
import ProfilePageWithAuth from '@components/ProfilePageWithAuth';
import '../../assets/styles/style.scss';

const ProfilePageApp = () => {
  return (
    <Provider store={store}>
      <ProfilePageWithAuth />
    </Provider>
  );
};

export default ProfilePageApp;
