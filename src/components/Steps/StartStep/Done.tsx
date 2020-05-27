import React from 'react';
import Button from "@components/Button";
import styles from './styles.module.scss';

const Done = () => {
  return (
    <>
      <p className={styles.description}>Setup completed</p>
      <Button type="innerLink" text="Go to instructions" href="/instructions" />
    </>
  );
};

export default Done;
