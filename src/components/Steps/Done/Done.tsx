import React from 'react';
import Button from '@components/Button';
import styles from './styles.module.scss';

const DoneStep = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Done!</h2>
      <Button type="link" href="/instructions" text="Continue" />
    </div>
  );
};

export default DoneStep;
