import React, { useState } from 'react';
import { TChoosedCloud } from '@src/types/reducers/page';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { LocalStorageKeys } from '@constants/localStorageKeys';
import { TPage } from '@src/types/routing';
import Button from '@components/Button';
import Private from '@components/Private';
import InnerSetupRedirect from '@src/components/InnerSetupRedirect';
import styles from './styles.module.scss';

export interface IStateProps {
  choosedCloud: TChoosedCloud;
}

// export interface IActionProps {
//   setPageStep: (step: TStep) => void;
// }

interface IComponentProps {
  error?: boolean;
}

type TProps = IStateProps & IComponentProps;

const ChooseAuth = ({ choosedCloud, error }: TProps) => {
  const [redirect, setRedirect] = useState<TPage | null>(null);
  const setUseOurRecources = useLocalStorage(LocalStorageKeys.USE_OUR_RESOURCES, true)[1];
  const setCredentionals = useLocalStorage(LocalStorageKeys.CREDENTIONALS, null)[1];

  if (redirect) {
    return <InnerSetupRedirect to={redirect} />;
  }

  return (
    <Private>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src={`../../../assets/img/cloudsLogo/${choosedCloud}.png`} alt={choosedCloud || ''} />
        </div>
        <div className={styles['buttons-block']}>
          <div className={styles['button-container']}>
            <Button type="innerLink" text="Login" href="/aws-credentials" />
          </div>
          <div className={styles['button-container']}>
            <Button type="innerLink" text="Sign up" href="/aws-credentials" />
          </div>
          <div className={styles['button-container']}>
            <Button
              text="Buy with Faceless"
              onClick={() => {
                setUseOurRecources(true);
                setCredentionals(null);
                setRedirect('/tarrifs');
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
