import React from 'react';
// import { TStep } from '@src/types/reducers/page';
import Button from '@components/Button';
import styles from './styles.module.scss';

// export interface IActionProps {
//   setPageStep: (step: TStep) => void;
// }

// type TProps = IActionProps;

const DoneStep = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Done!</h2>
      <Button text="Continue" />
    </div>
  );
};

export default DoneStep;
