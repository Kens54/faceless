import React from 'react';
import { TChoosedCloud, TStep } from '@src/types/reducers/page';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { LocalStorageKeys } from '@constants/localStorageKeys';
import Button from '@components/Button';
import Private from '@components/Private';
import styles from './styles.module.scss';

export interface IStateProps {
  choosedCloud: TChoosedCloud;
}

export interface IActionProps {
  setPageStep: (step: TStep) => void;
}

interface IComponentProps {
  error?: boolean;
}

type TProps = IStateProps & IActionProps & IComponentProps;

const ChooseAuth = ({ choosedCloud, setPageStep, error }: TProps) => {
  const setUseOurRecources = useLocalStorage(LocalStorageKeys.USE_OUR_RESOURCES, true)[1];
  const setCredentionals = useLocalStorage(LocalStorageKeys.CREDENTIONALS, null)[1];

  return (
    <Private>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src={`../../../assets/img/cloudsLogo/${choosedCloud}.png`} alt={choosedCloud || ''} />
        </div>
        <div className={styles['buttons-block']}>
          <div className={styles['button-container']}>
            <Button text="Login" onClick={() => setPageStep('awsCredentials')} />
          </div>
          <div className={styles['button-container']}>
            <Button text="Sign up" onClick={() => setPageStep('awsCredentials')} />
          </div>
          <div className={styles['button-container']}>
            <Button
              text="Buy with Faceless"
              onClick={() => {
                setUseOurRecources(true);
                setCredentionals(null);
                setPageStep('tarrifs');
              }}
            />
          </div>
        </div>
        {error && <div className={styles.error}>Your payment has been failed. Please try again</div>}
      </div>
    </Private>
  );
};

export default ChooseAuth;
