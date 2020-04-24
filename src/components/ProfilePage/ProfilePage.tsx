import React, { useEffect } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import { IProfileData, TCardState, TSubscriptionsState } from '@src/types/reducers/api';
import { useToken } from '@hooks/useToken';
import { get } from '@common/fetch';
import { IMeSuccessResponse } from '@src/types/api/me';
import { ISuccessRefreshTokenResponse } from '@src/types/api/refresh_token';
import { ISuccessBillingInfoRequest } from '@src/types/api/billingInfo';
import { IResponseError } from '@src/types/api/error';
import Section from './Section';
import PersonalDataItem from './PersonalDataItem';
import Subscriptions from './Subscriptions';
import PaymentMethod from './PaymentMethod';
import styles from './styles.module.scss';

export interface IStateProps {
  fullName: string;
  email: string;
  accountStatus: string;
  card: TCardState;
  subscriptions: TSubscriptionsState;
}

export interface IActionProps {
  setProfileData: (data: IProfileData) => void;
  setCardData: (card: TCardState) => void;
  setSubscriptionsData: (subscriptions: TSubscriptionsState) => void;
}

type IProps = IStateProps & IActionProps;

const ProfilePage = ({
  fullName,
  email,
  accountStatus,
  card,
  subscriptions,
  setProfileData,
  setCardData,
  setSubscriptionsData,
}: IProps) => {
  const [token, setToken] = useToken();

  useEffect(() => {
    if (token) {
      const params = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      get('/me', params)
        .then((res: AxiosResponse<IMeSuccessResponse>) => {
          if (res.data.code === 200) {
            setProfileData(res.data.payload);
          }
        })
        .catch((error: AxiosError<IResponseError>) => {
          if (error.response) {
            if (error.response.data.code === 401) {
              get('/refresh_token', params).then((res: AxiosResponse<ISuccessRefreshTokenResponse>) => {
                if (res.data.code === 200) {
                  setToken(res.data.payload.token);
                }
              });
            }
          }
        });

      get('/me/billing/info', params).then((res: AxiosResponse<ISuccessBillingInfoRequest>) => {
        if (res.data.code === 200) {
          setCardData(res.data.payload.card);
          setSubscriptionsData(res.data.payload.subscriptions);
        }
      });
    } else {
      window.location.replace(`${window.location.origin}/members`);
    }
    /* eslint-disable */
  }, [setProfileData, token, setCardData, setSubscriptionsData]);
  /* eslint-enable */

  return (
    <div className={styles.wrapper}>
      <Section title="Personal data">
        <PersonalDataItem title="Full name" value={fullName} isEditingField={false} />
        <PersonalDataItem title="Email" value={email} isEditingField={false} />
      </Section>
      <Section title="Account status">
        <div className={styles['account-status']}>{accountStatus === 'free' ? 'Free' : 'Premium subscription'}</div>
      </Section>
      {subscriptions !== null && (
        <Section title="Subscriptions">
          <Subscriptions subscriptions={subscriptions} />
        </Section>
      )}
      {card !== null && (
        <Section title="Payment method">
          <PaymentMethod card={card} />
        </Section>
      )}
    </div>
  );
};

export default ProfilePage;
