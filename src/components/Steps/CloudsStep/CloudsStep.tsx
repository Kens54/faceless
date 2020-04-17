import React from 'react';
import CloudList from './CloudList';
import styles from './styles.module.scss';

const CloudsStep = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Choose cloud</h2>
      <CloudList />
    </div>
  );
};

export default CloudsStep;
