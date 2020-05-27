import React from 'react';
import Button from '@components/Button';
import styles from './styles.module.scss';

const ContinueSetup = () => {
  return (
    <>
      <p className={styles.description}>Download started</p>
      <div className={styles['button-container']}>
        <Button type="innerLink" text="Continue" href="/expect-installation" />
      </div>
    </>
  );
};

export default ContinueSetup;
