import React, { useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { TTariffsDataState } from '@src/types/reducers/api';
import { ISuccessTariffsResponse } from '@src/types/api/tariffs';
import { TButtonColor } from '@src/types/components/button';
import { get } from '@common/fetch';
import Private from '@src/HOCs/Private';
import Plan from './Plan';
import styles from './styles.module.scss';

export interface IStateProps {
  tariffs: TTariffsDataState;
}

export interface IActionProps {
  setTariffsData: (tariffs: TTariffsDataState) => void;
}

interface IComponentProps {
  error?: boolean;
}

type TProps = IStateProps & IActionProps & IComponentProps;

const Plans = ({ tariffs, error, setTariffsData }: TProps) => {
  useEffect(() => {
    get({
      method: '/billing/tariffs',
      successCallback: (res: AxiosResponse<ISuccessTariffsResponse>) => {
        if (res.data.code === 200) {
          setTariffsData(res.data.payload);
        }
      },
    });
  }, [setTariffsData]);

  if (tariffs === null) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Pricing plans</h2>
      {error && <div className={styles.error}>Your payment has been failed. Please try again</div>}
      <div className={styles['plans-list']}>
        {tariffs.map((plan, key) => {
          const btnColor: TButtonColor = key % 2 === 0 ? 'green' : 'red';

          return (
            <Plan
              key={plan.id}
              id={plan.id}
              title={plan.name}
              price={plan.amount}
              currency={plan.currency}
              btnColor={btnColor}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Private(Plans);
