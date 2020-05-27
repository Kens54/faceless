import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

interface IComponentProps {
  title: string;
  children: React.ReactNode;
  Button?: React.FunctionComponent;
}

type TProps = IComponentProps;

const Section = ({ title, children, Button }: TProps) => {
  const titleContainerClasses = classNames(styles['title-container'], {
    [styles['title-container--without-button']]: Boolean(!Button),
  });

  return (
    <section className={styles.section}>
      <div className={titleContainerClasses}>
        <h3 className={styles.title}>{title}</h3>
        {Button && <Button />}
      </div>
      <div className={styles['content-container']}>{children}</div>
    </section>
  );
};

export default Section;
