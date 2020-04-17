import React from 'react';
import styles from './styles.module.scss';

interface IComponentProps {
  title: string;
  value: string;
  isEditingField: boolean;
  onChange?: (value: string) => void;
}

type TProps = IComponentProps;

const PersonalDataItem = ({ title, value, isEditingField }: TProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>{value}</div>
      {isEditingField && (
        <button type="button" className={styles['edit-button']}>
          Edit
        </button>
      )}
    </div>
  );
};

export default PersonalDataItem;
