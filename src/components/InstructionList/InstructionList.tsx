import React from 'react';
import Item, { IItem } from './Item';
import styles from './styles.module.scss';

interface IComponentProps {
  title: string;
  items: IItem[];
}

type TProps = IComponentProps;

const InstructionList = ({ title, items }: TProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {items.map(item => (
          <Item key={item.number} number={item.number} content={item.content} />
        ))}
      </ul>
    </div>
  );
};

export default InstructionList;
