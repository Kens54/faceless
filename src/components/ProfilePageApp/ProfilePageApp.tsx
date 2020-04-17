import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@src/store/configStore';
import ProfilePage from '@components/ProfilePage';
import '../../assets/styles/style.scss';

const ProfilePageApp = () => {
  return (
    <Provider store={store}>
      <ProfilePage />
    </Provider>
  );
};

export default ProfilePageApp;
