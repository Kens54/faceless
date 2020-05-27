import React from 'react';
import Button from '@components/Button';
import styles from './styles.module.scss';

interface IComponentProps {
  onClickFaceless: () => void;
  disableFacelessButton: boolean;
}

type TProps = IComponentProps;

const Default = ({onClickFaceless, disableFacelessButton=false}: TProps) => {
  return (
    <>
      <h2 className={styles.title}>Set up vpn on your server</h2>
      <p className={styles.description}>Online anonymity</p>
      <div className={styles['button-container']}>
        <Button
          type="button"
          text="Start with faceless"
          disabled={disableFacelessButton}
          onClick={onClickFaceless}
        />
      </div>
      {/* Выбор облака */}
      {/* <div className={styles['middle-text']}>or with</div>
          <Button
            type="button"
            text="Existing server"
            disabled={usedOurResources === true}
            onClick={() => handleClickNextStep('existing')}
          /> */}
    </>
  );
};

export default Default;
