import React from 'react';
import Button from '@components/Button';
import styles from './styles.module.scss';

const InstructionsStep = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Instructions is coming soon</h2>
      <div className={styles.button}>
        <Button type="link" href="/profile" text="Go to profile" />
      </div>
    </div>
  );
};

export default InstructionsStep;
