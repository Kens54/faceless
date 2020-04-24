import React from 'react';
import { ICard } from '@src/types/reducers/api';
import styles from './styles.module.scss';

interface IComponentProps {
  card: ICard;
}

type TProps = IComponentProps;

const PaymentMethod = ({ card }: TProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles['card-number']}>{card.card_number}</div>
      <div className={styles['card-expiry']}>
        Expiration Date:{' '}
        <span className={styles['card-expiry-number']}>
          {card.card_expiry_month}.{card.card_expiry_year}
        </span>
      </div>
    </div>
  );
};

export default PaymentMethod;
