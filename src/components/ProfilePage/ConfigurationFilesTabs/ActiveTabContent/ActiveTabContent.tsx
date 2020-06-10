import React from 'react';
import { TCatygoryTitle, ISortedLinks } from '../types';
import TextPlatformContent from '../PlatformContent/TextPlatformContent';
import LinksPlatformContent from '../PlatformContent/LinksPlatformContent';
import styles from './styles.module.scss';

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
              text="Use the SSH-key to verify the transparency of our service and check the operation of your personal server."
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
