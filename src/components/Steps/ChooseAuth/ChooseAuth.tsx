import React from 'react';
import { TChoosedCloud, TStep } from '@src/types/reducers/page';
import Button from '@components/Button';
import Private from '@components/Private';
import styles from './styles.module.scss';

export interface IStateProps {
  choosedCloud: TChoosedCloud;
}

export interface IActionProps {
  setPageStep: (step: TStep) => void;
}

type TProps = IStateProps & IActionProps;

const ChooseAuth = ({ choosedCloud, setPageStep }: TProps) => {
  return (
    <Private>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src={`../../../assets/img/cloudsLogo/${choosedCloud}.png`} alt={choosedCloud || ''} />
        </div>
        <div className={styles['buttons-block']}>
          <div className={styles['button-container']}>
            <Button
              text="Login"
              onClick={() => {
                // setPageStep('login');
              }}
            />
          </div>
          <div className={styles['button-container']}>
            <Button
              text="Sign up"
              onClick={() => {
                // setPageStep('register');
              }}
            />
          </div>
          <div className={styles['button-container']}>
            <Button
              text="Buy with Faceless"
              onClick={() => {
                setPageStep('plans');
              }}
            />
          </div>
        </div>
      </div>
    </Private>
  );
};

export default ChooseAuth;
