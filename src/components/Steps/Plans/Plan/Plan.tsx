import React from 'react';
import { AxiosResponse } from 'axios';
import { get } from '@common/fetch';
import { useToken } from '@hooks/useToken';
import { TButtonColor } from '@src/types/components/button';
import { ISuccesBillingRedirectLink } from '@src/types/api/billingRedirectLink';
import Button from '@components/Button';
import styles from './styles.module.scss';

interface IComponentProps {
  id: number;
  title: string;
  price: number;
  currency: string;
  btnColor?: TButtonColor;
}

type IProps = IComponentProps;

const Plan = ({ id, title, price, btnColor, currency }: IProps) => {
  const token = useToken()[0];
  const handleClickBuyButton = () => {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    get(`/billing/tariff/${id}`, params).then((res: AxiosResponse<ISuccesBillingRedirectLink>) => {
      if (res.data.code === 200) {
        window.location.href = res.data.payload.redirect;
      }
    });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.price}>
        {price}
        <span className={styles.currency}>{currency}</span>
      </div>
      <Button color={btnColor} text="Buy" onClick={handleClickBuyButton} />
    </div>
  );
};

export default Plan;
