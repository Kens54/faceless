import React, { useEffect } from 'react';
import { get } from '@common/fetch';
import { useToken } from '@hooks/useToken';
import Button from '@components/Button';
import styles from './styles.module.scss';

const DoneStep = () => {
  const token = useToken()[0];

  useEffect(() => {
    fetch('http://faceless-api.service.faceless-staging.consul/me/ip', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => console.log(data));

    get('/me/ip', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }, [token]);
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Done!</h2>
      <Button text="Continue" />
    </div>
  );
};

export default DoneStep;
