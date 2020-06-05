import React, { useEffect, useState, useRef, useCallback } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import lottie from 'lottie-web';
import { get } from '@common/fetch';
import { TPage } from '@src/types/routing';
import { TServerType } from '@src/types/reducers/page';
import { TSetupStatus } from '@src/types/api/setup-status';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { LocalStorageKeys } from '@src/constants/localStorageKeys';
import { IMeSuccessResponse, IMeFailedResponse } from '@src/types/api/me';
import { ISuccessMeVpnsRequest } from '@src/types/api/me-vpns';
import InnerSetupRedirect from '@src/components/InnerSetupRedirect';
import StepContent from './StepContent';
import styles from './styles.module.scss';

export interface IActionProps {
  setServerType: (serverType: TServerType) => void;
  setSetupId: (setupId: number) => void;
}

type TProps = IActionProps;

const StartStep = ({ setServerType, setSetupId }: TProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [nextStep, setNextStep] = useState<'auth' | 'buy' | 'protocol' | null>(null);
  const [redirect, setRedirect] = useState<TPage | null>(null);
  const [usedOurResources, setUsedOurResources] = useState<boolean | null>(null);
  const [setupStatus, setSetupStatus] = useState<TSetupStatus>('');
  const loaderRef = useRef<HTMLDivElement>(null);
  const setUseOurResources = useLocalStorage(LocalStorageKeys.USE_OUR_RESOURCES, true)[1];
  const setCredentionals = useLocalStorage(LocalStorageKeys.CREDENTIONALS, null)[1];

  useEffect(() => {
    get({
      method: '/me',
      successCallback: (res: AxiosResponse<IMeSuccessResponse>) => {
        setLoading(false);

        const data = res.data.payload;
        if (res.data.code === 200) {
          if (data.payment_type === 'card' && data.expires_in > 0) {
            setNextStep('protocol');
          } else {
            setNextStep('buy');
          }
        }
      },
      errorCallback: (error: AxiosError<IMeFailedResponse>) => {
        setLoading(false);
        if (error.response) {
          setNextStep('auth');
        }
      },
      authErrorCallback: () => {
        setLoading(false);
        setNextStep('auth');
      },
    });

    get({
      method: '/me/vpns',
      successCallback: (res: AxiosResponse<ISuccessMeVpnsRequest>) => {
        const list = res.data.payload;

        // let ourResourcesSetup = [];
        // let cloudSetup = [];

        list.every(item => {
          if (item.setup_status === 'started' || item.setup_status === 'starting') {
            setSetupStatus(item.setup_status);
            setUsedOurResources(item.used_our_resources);
            setSetupId(item.id);
            return false;
          }
          return true;
        });
      },
    });
  }, [setSetupId]);

  useEffect(() => {
    if (loading && loaderRef.current !== null) {
      lottie.loadAnimation({
        container: loaderRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '../../../assets/json/loader.json',
      });
    }
  }, [loading]);

  const handleClickNextStep = useCallback(
    (type: TServerType) => {
      setServerType(type);

      if (nextStep === 'auth') {
        setRedirect('/login');
      } else if (nextStep === 'buy') {
        if (type === 'faceless') {
          setRedirect('/tariffs');
          setCredentionals(null);
          setUseOurResources(true);
        } else if (type === 'existing') {
          setRedirect('/choose-cloud');
        }
      } else if (nextStep === 'protocol') {
        setRedirect('/choose-protocol');
      }
    },
    [nextStep, setServerType, setCredentionals, setUseOurResources],
  );

  if (redirect) {
    return <InnerSetupRedirect to={redirect} />;
  }

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <div ref={loaderRef} className={styles.loader} />
      ) : (
        <StepContent
          setupStatus={setupStatus}
          onClickFaceless={() => handleClickNextStep('faceless')}
          disableFacelessButton={usedOurResources === false}
        />
      )}
    </div>
  );
};

export default StartStep;
