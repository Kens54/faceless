import React, { useState } from 'react';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { LocalStorageKeys } from '@constants/localStorageKeys';
import { TPage } from '@src/types/routing';
import Button from '@components/Button';
import InnerSetupRedirect from '@src/components/InnerSetupRedirect';
import styles from './styles.module.scss';

// export interface IActionProps {
//   setPageStep: (step: TStep) => void;
// }

// type TProps = IActionProps;

const Form = () => {
  const [redirect, setRedirect] = useState<TPage | null>(null);
  const [keyId, setKeyId] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  // const [region, setRegion] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const setUseOurRecources = useLocalStorage(LocalStorageKeys.USE_OUR_RESOURCES, true)[1];
  const setCredentionals = useLocalStorage(LocalStorageKeys.CREDENTIONALS, null)[1];

  const regs = {
    keyId: /(?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])/g,
    secretKey: /(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])/g,
  };

  const onSubmit = () => {
    if (keyId === '' || secretKey === '') {
      setError('Fill in all the fields');
    } else if (!regs.keyId.test(keyId)) {
      setError('Invalid Access Key ID');
    } else if (!regs.secretKey.test(secretKey)) {
      setError('Invalid Secret access key');
    } else {
      setUseOurRecources(false);
      setCredentionals({
        aws_region: 'us-east-2',
        aws_access_key: keyId,
        aws_secret_key: secretKey,
      });
      setRedirect('/tarrifs');
    }
  };

  if (redirect) {
    return <InnerSetupRedirect to={redirect} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Please insert your Access key ID and Secret access key</h2>
        <form className={styles.form}>
          <div className={styles['input-container']}>
            <span className={styles['input-title']}>Access key ID</span>
            <input
              className={styles.input}
              placeholder="AKIAIOSFODNN7EXAMPLE"
              value={keyId}
              onChange={e => setKeyId(e.target.value)}
            />
          </div>
          <div className={styles['input-container']}>
            <span className={styles['input-title']}>Secret access key</span>
            <input
              className={styles.input}
              placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
              value={secretKey}
              onChange={e => setSecretKey(e.target.value)}
            />
          </div>
          {/* <div className={styles['input-container']}>
            <span className={styles['input-title']}>Region</span>
            <input
              className={styles.input}
              placeholder="us-east-2"
              value={region}
              onChange={e => setRegion(e.target.value)}
            />
          </div> */}
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.button}>
            <Button text="Next" onClick={onSubmit} />
          </div>
          <div className={styles.button}>
            <Button
              text="or buy with faceless"
              type="innerLink"
              className={styles['back-button']}
              href="/choose-auth"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
