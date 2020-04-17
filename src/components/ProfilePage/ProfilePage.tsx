import React, { useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { IProfileData, TProfileDataState } from '@src/types/reducers/api';
import { useToken } from '@hooks/useToken';
import { get } from '@common/fetch';
import { IMeSuccessResponse } from '@src/types/api/me';
import { ISuccessRefreshTokenResponse } from '@src/types/api/refresh_token';
import Section from './Section';
import PersonalDataItem from './PersonalDataItem';
import styles from './styles.module.scss';

export interface IStateProps {
  fullName: string;
  email: string;
  accountStatus: string;
  profile: TProfileDataState;
}

export interface IActionProps {
  setProfileData: (data: IProfileData) => void;
}

type IProps = IStateProps & IActionProps;

const ProfilePage = ({ fullName, email, accountStatus, profile, setProfileData }: IProps) => {
  const [token, setToken] = useToken();

  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    (async function getProfileData() {
      if (token) {
        try {
          const res: AxiosResponse<IMeSuccessResponse> = await get('/me', params);

          if (res.data.code === 200) {
            setProfileData(res.data.payload);
          }
        } catch (error) {
          const tokenRes: AxiosResponse<ISuccessRefreshTokenResponse> = await get('/refresh_token', params);

          if (tokenRes.data.code === 200) {
            setToken(tokenRes.data.payload.token);
          }
        }
      }
    })();
  }, [params, token, setToken, setProfileData]);

  if (token === null || profile === null) {
    return <div>No data</div>;
  }

  return (
    <div className={styles.wrapper}>
      <Section title="Personal data">
        <PersonalDataItem title="Full name" value={fullName} isEditingField={false} />
        <PersonalDataItem title="Full name" value={email} isEditingField={false} />
      </Section>
      <Section title="Account status">
        <div className={styles['account-status']}>{accountStatus === 'free' ? 'Free' : 'Premium subscription'}</div>
      </Section>
    </div>
  );
};

export default ProfilePage;
