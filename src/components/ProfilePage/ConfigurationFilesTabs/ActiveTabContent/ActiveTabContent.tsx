import React from 'react';
import { TCatygoryTitle, ISortedLinks } from '../types';
import styles from './styles.module.scss';
import TextPlatformContent from '../PlatformContent/TextPlatformContent';
import LinksPlatformContent from '../PlatformContent/LinksPlatformContent';

interface IComponentProps {
  sortedLinks: ISortedLinks[];
  activeTab: TCatygoryTitle;
}

type TProps = IComponentProps;

const ActiveTabContent = ({ activeTab, sortedLinks }: TProps) => {
  return (
    <div className={styles.container}>
      {sortedLinks.map(({ title, links }) => {
        if (title !== activeTab) {
          return null;
        }

        if (title === 'SSH') {
          return (
            <TextPlatformContent
              key={title}
              text="Используйте SHH-ключ, чтобы убедиться в прозрачности нашего сервиса и проверить работу своего личного сервера."
              links={links}
            />
          );
        }

        return <LinksPlatformContent key={title} links={links} />;
      })}
    </div>
  );
};

export default ActiveTabContent;
