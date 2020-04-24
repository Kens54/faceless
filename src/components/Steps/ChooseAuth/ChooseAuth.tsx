import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { TChoosedCloud } from '@src/types/reducers/page';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { TPage } from '@src/types/routing';
import { SET_UP_PAGE_PATH } from '@src/constants/routing';
import { LocalStorageKeys } from '@constants/localStorageKeys';
import Button from '@components/Button';
import Private from '@components/Private';
import styles from './styles.module.scss';

export interface IStateProps {
  choosedCloud: TChoosedCloud;
}

type TProps = IStateProps;

const ChooseAuth = ({ choosedCloud }: TProps) => {
  const [redirect, setRedirect] = useState<TPage | null>(null);
  const setUseOurRecources = useLocalStorage(LocalStorageKeys.USE_OUR_RESOURCES, true)[1];
  const setCredentionals = useLocalStorage(LocalStorageKeys.CREDENTIONALS, null)[1];

  if (redirect !== null) {
    return <Redirect to={`${SET_UP_PAGE_PATH}${redirect}`} />;
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
      </div>
    </Private>
  );
};

export default ChooseAuth;
