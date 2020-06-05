import React from 'react';
import { ILink } from '../../types';
import FileLink from '../../Link';
import styles from './styles.module.scss';

interface IComponentProps {
  links: ILink[];
}

type TProps = IComponentProps;

const LinksPlatformContent = ({ links }: TProps) => {
  return (
    <div className={styles.container}>
      {links.map(link => {
        return (
          <div key={link.apiLink} className={styles['link-container']}>
            <div className={styles['link-name']}>{link.linkName}</div>
            <FileLink link={link} />
          </div>
        );
      })}
    </div>
  );
};

export default LinksPlatformContent;
