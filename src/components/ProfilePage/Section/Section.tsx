import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

interface IComponentProps {
  title: string;
  children: React.ReactNode;
  Button?: React.FunctionComponent;
  withoutBackground?: boolean;
}

type TProps = IComponentProps;

const Section = ({ title, children, Button, withoutBackground }: TProps) => {
  const contentClassNames = classNames(styles['content-container'], {
    [styles['content-container--without-background']]: withoutBackground,
  });

  const titleContainerClasses = classNames(styles['title-container'], {
    [styles['title-container--without-button']]: Boolean(!Button),
  });

  return (
    <section className={styles.section}>
      <div className={titleContainerClasses}>
        <h3 className={styles.title}>{title}</h3>
        {Button && <Button />}
      </div>
      <div className={contentClassNames}>{children}</div>
    </section>
  );
};

export default Section;
