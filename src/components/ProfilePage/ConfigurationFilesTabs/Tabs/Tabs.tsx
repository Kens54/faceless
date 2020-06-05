import React from 'react';
import classNames from 'classnames';
import { TCatygoryTitle, ISortedLinks } from '../types';
import styles from './styles.module.scss';

interface IComponentProps {
  sortedLinks: ISortedLinks[];
  activeTab: TCatygoryTitle;
  setActiveTab: (title: TCatygoryTitle) => void;
}

type TProps = IComponentProps;

const Tabs = ({ sortedLinks, activeTab, setActiveTab }: TProps) => {
  return (
    <div className={styles.container}>
      {sortedLinks.map(({ title, icon }) => {
        const isActiveTab = title === activeTab;
        const tabClassNames = classNames(styles.tab, { [styles['tab--active']]: isActiveTab });
        const titleClassNames = classNames(styles.title, styles[`title--${title}`]);

        const handleClick = () => {
          if (!isActiveTab) {
            setActiveTab(title);
          }
        };

        return (
          <button type="button" key={title} className={tabClassNames} onClick={handleClick}>
            {icon && <img className={styles.icon} src={`../../../../assets/img/platforms/${icon}.png`} alt={title} />}
            <span className={titleClassNames}>{title}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
