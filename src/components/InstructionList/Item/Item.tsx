import React from 'react';
import styles from './styles.module.scss';

export interface IItem {
  number: number;
  content: React.ReactNode;
}

type TComponentProps = IItem;

type TProps = TComponentProps;

const Item = ({ number, content }: TProps) => {
  return (
    <li className={styles.item}>
      <div className={styles.number}>{number}</div>
      <div className={styles.content}>{content}</div>
    </li>
  );
};

export default Item;
