import React from 'react';
import Private from '@components/Private';
import CloudList from './CloudList';
import styles from './styles.module.scss';

const CloudsStep = () => {
  return (
    <Private>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Choose cloud</h2>
        <CloudList />
      </div>
    </Private>
  );
};

export default CloudsStep;
