import React from 'react';
import moment from 'moment';
import { TSubscriptionsState } from '@src/types/reducers/api';
import styles from './styles.module.scss';

interface IComponentProps {
  subscriptions: TSubscriptionsState;
}

type TProps = IComponentProps;

const Subscriptions = ({ subscriptions }: TProps) => {
  if (!subscriptions) {
    return null;
  }

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <div className={`${styles['header-item']} ${styles['header-item--1']}`}>Subscription begin date </div>
        <div className={`${styles['header-item']} ${styles['header-item--2']}`}>Subscription end date</div>
        <div className={`${styles['header-item']} ${styles['header-item--3']}`}>Subscription type</div>
        <div className={`${styles['header-item']} ${styles['header-item--4']}`}>Status</div>
        <div className={`${styles['header-item']} ${styles['header-item--5']}`}>Edit</div>
      </div>
      {subscriptions.map((item, key) => {
        const startedDate = moment(item.started_at).format('YYYY-MM-DD hh:mm');
        const expiredDate = moment(item.expired_at).format('YYYY-MM-DD hh:mm');
        const status = item.is_active ? 'ACTIVE' : 'NOT ACTIVE';

        return (
          <div key={item.started_at.toString() + key.toString()} className={styles['table-row']}>
            <div className={`${styles['table-item']} ${styles['table-item--1']}`}>{startedDate}</div>
            <div className={`${styles['table-item']} ${styles['table-item--2']}`}>{expiredDate}</div>
            {item.tariff ? (
              <div className={`${styles['table-item']} ${styles['table-item--3']}`}>{item.tariff.name}</div>
            ) : (
              <div>Tarrif not found</div>
            )}
            <div className={`${styles['table-item']} ${styles['table-item--4']}`}>{status}</div>
            <div className={`${styles['table-item']} ${styles['table-item--5']}`}>
              <a href="/set-up/tariffs" className={styles.link}>
                Edit
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Subscriptions;
