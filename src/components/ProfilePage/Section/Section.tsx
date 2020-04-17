import React from 'react';
import styles from './styles.module.scss';

interface IComponentProps {
  title: string;
  children: React.ReactNode;
}

type TProps = IComponentProps;

const Section = ({ title, children }: TProps) => {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles['content-container']}>{children}</div>
    </section>
  );
};

export default Section;
