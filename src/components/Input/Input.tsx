import React from 'react';
import styles from './styles.module.scss';

interface IComponentProps {
  inputName: string;
  id: string;
  type: HTMLInputElement['type'];
  value: string;
  onChange: (value: string) => void;
}

type TProps = IComponentProps;

const Input = ({ inputName, id, type, onChange, value }: TProps) => {
  return (
    <div className={styles.container}>
      <span className={styles['input-name']}>{inputName}:</span>
      <input className={styles.input} id={id} type={type} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
};

export default Input;
