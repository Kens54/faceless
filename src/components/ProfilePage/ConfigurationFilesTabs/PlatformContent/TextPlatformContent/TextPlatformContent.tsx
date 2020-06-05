import React from 'react';
import { ILink } from '../../types';
import FileLink from '../../Link';
import styles from './styles.module.scss';

interface IComponentProps {
  text: string;
  links: ILink[];
}

type TProps = IComponentProps;

const TextPlatformContent = ({ text, links }: TProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{text}</p>
      <div className={styles.links}>
        {links.map(link => {
          return (
            <div className={styles.link} key={link.apiLink}>
              <FileLink link={link} linkName="Download" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TextPlatformContent;
