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
            <FileLink link={link} linkName={link.linkName} />
          </div>
        );
      })}
    </div>
  );
};

export default LinksPlatformContent;
