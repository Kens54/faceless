import React from 'react';
import Button from '@components/Button';
import styles from './styles.module.scss';

const InstructionsStep = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Save configuration file</h2>
      <div className={styles.button}>
        <Button type="link" href="/profile" text="Download" />
      </div>
    </div>
  );
};

export default InstructionsStep;
