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
  // useEffect(() => {
  //   if (token) {
  //     get('/me', params)
  //       .then((res: AxiosResponse<IMeSuccessResponse>) => {
  //         if (res.data.code === 200) {
  //           setProfileData(res.data.payload);
  //           console.log(res.data);
  //         }
  //         console.log(res);
  //       })
  //       .catch((error: AxiosError<IMeFailedResponse>) => {
  //         console.log(error);
  //       });
  //   } else {
  //     console.log(token);
  //   }
  // }, [token, setProfileData]);

  useEffect(() => {
    (async function getProfileData() {
      if (token) {
        try {
          const res: AxiosResponse<IMeSuccessResponse> = await get('/me', params);

          if (res.data.code === 200) {
            setProfileData(res.data.payload);
            console.log(res.data);
          }
        } catch (error) {
          try {
            const tokenRes: AxiosResponse<ISuccessRefreshTokenResponse> = await get('/refresh_token', params);

            if (tokenRes.data.code === 200) {
              setToken(tokenRes.data.payload.token);

              try {
                const meRes = await get('/me', {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${tokenRes.data.payload.token}`,
                  },
                });

                console.log(meRes);
              } catch (efrror) {
                console.log('efrror', efrror.response);
              }
            }
            console.log('error', error.response);
          } catch (tokenError) {
            console.log('Token error', tokenError.response);
          }
        }
      }
    })();

    // if (token) {
    //   try {
    //     get('/me', {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //       .then((res: AxiosResponse<IMeSuccessResponse>) => {
    //         if (res.data.code === 200) {
    //           setProfileData(res.data.payload);
    //           console.log(res.data);
    //         }
    //         console.log(res);
    //       })
    //       .catch((error: AxiosError<IMeFailedResponse>) => {
    //         console.log(error);
    //       });
    //   } else {
    //     console.log(token);
    //   }
    //   } catch (error) {

    //   }
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
