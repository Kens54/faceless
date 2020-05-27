import React, { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { IProfileData, TCardState, TSubscriptionsState } from '@src/types/reducers/api';
import { get } from '@common/fetch';
import { IMeSuccessResponse } from '@src/types/api/me';
import { ISuccessBillingInfoRequest } from '@src/types/api/billingInfo';
import { ISuccessMeVpnsRequest } from '@src/types/api/me-vpns';
import { ISuccessMeVpnCustomConfigs } from '@src/types/api/me-vpn-custom-configs';
import { TProfilePageStep } from '@src/types/reducers/profilePage';
import { useToken } from '@hooks/useToken';
import Section from './Section';
import SectionButton from './SectionButton';
import PersonalDataItem from './PersonalDataItem';
import Subscriptions from './Subscriptions';
import PaymentMethod from './PaymentMethod';
import ConfigurationFiles from './ConfigurationFiles';
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
  setProfilePageStep: (step: TProfilePageStep) => void;
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
  setProfilePageStep,
}: IProps) => {
  const [setupId, setSetupId] = useState<number | null>(null);
  const [configsLinks, setConfigsLinks] = useState<string[] | null>(null);
  const setToken = useToken()[1];

  useEffect(() => {
    get({
      method: '/me',
      successCallback: (res: AxiosResponse<IMeSuccessResponse>) => {
        if (res.data.code === 200) {
          setProfileData(res.data.payload);
        }
      },
    });

    get({
      method: '/me/billing/info',
      successCallback: (res: AxiosResponse<ISuccessBillingInfoRequest>) => {
        if (res.data.code === 200) {
          setCardData(res.data.payload.card);
          setSubscriptionsData(res.data.payload.subscriptions);
        }
      },
    });

    get({
      method: '/me/vpns',
      successCallback: (res: AxiosResponse<ISuccessMeVpnsRequest>) => {
        const list = res.data.payload;
        let startedVpnId: number | null = null;

        list.every(item => {
          if (item.setup_status === 'started') {
            startedVpnId = item.id;
            return false;
          }
          return true;
        });

        if (startedVpnId) {
          get({
            method: `/me/vpn/${startedVpnId}/configs-custom`,
            successCallback: (startedVpnRes: AxiosResponse<ISuccessMeVpnCustomConfigs>) => {
              setConfigsLinks(startedVpnRes.data.payload);
              setSetupId(startedVpnId);
            },
          });
        }
      },
    });
  }, [setProfileData, setCardData, setSubscriptionsData]);

  return (
    <div className={styles.wrapper}>
      <Section
        title="Personal data"
        Button={() => (
          <SectionButton
            text="Logout"
            icon="logout"
            onClick={() => {
              setToken(null);
              setProfilePageStep('login');
            }}
          />
        )}
      >
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
      {configsLinks !== null && setupId && (
        <Section
          title="Configuration files"
          Button={() => <SectionButton text="Instructions" icon="gear" href="/set-up/instructions" />}
        >
          <ConfigurationFiles configsLinks={configsLinks} setupId={setupId} />
        </Section>
      )}
    </div>
  );
};

export default ProfilePage;
