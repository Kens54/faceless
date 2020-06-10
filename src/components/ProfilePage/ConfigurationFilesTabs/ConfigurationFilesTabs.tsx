import React, { useState } from 'react';
import { TCatygoryTitle, ISortedLinks, ILink } from './types';
import Tabs from './Tabs';
import ActiveTabContent from './ActiveTabContent';
// import Item from './Item';
import styles from './styles.module.scss';

interface IComponentProps {
  configsLinks: string[];
  setupId: number;
}

type TProps = IComponentProps;

const ConfigurationFilesTabs = ({ configsLinks, setupId }: TProps) => {
  const [activeTab, setActiveTab] = useState<TCatygoryTitle>('Windows');

  const windowsLinks: ISortedLinks = { title: 'Windows', icon: 'windows', links: [] };
  const macLinks: ISortedLinks = { title: 'Mac', icon: 'mac', links: [] };
  const androidLinks: ISortedLinks = { title: 'Android', icon: 'android', links: [] };
  const iosLinks: ISortedLinks = { title: 'IOS', icon: 'ios', links: [] };
  const sshLinks: ISortedLinks = { title: 'SSH', icon: null, links: [] };

  configsLinks.forEach(item => {
    const extIndex = item.lastIndexOf('.');

    const ext = item.slice(extIndex + 1);
    const linkName = item.slice(`/me/vpn/${setupId}/configs-custom/`.length, extIndex);
    const fileName = item.slice(`/me/vpn/${setupId}/configs-custom/`.length);

    const link: ILink = {
      apiLink: item,
      linkName,
      fileName,
      ext,
    };

    if (item.includes('openvpn')) {
      windowsLinks.links.push(link);
      macLinks.links.push(link);
      androidLinks.links.push(link);
      iosLinks.links.push(link);
    }

    if (item.search(/(ipsec\/p12|ipsec\/p12pw|ipsec\/cacert|ipsec\/sswanconfig)/) > -1) {
      windowsLinks.links.push(link);
    } else if (item.search(/(macos\/wireguard)/) > -1) {
      macLinks.links.push(link);
    } else if (item.search(/(wireguard\.png)/) > -1) {
      androidLinks.links.push(link);
    } else if (item.search(/(os\/ikev2|ios\/wireguard)/) > -1) {
      iosLinks.links.push(link);
    } else if (item.search(/(ssh)/) > -1) {
      sshLinks.links.push(link);
    }
  });

  const sortedLinks = [windowsLinks, macLinks, androidLinks, iosLinks, sshLinks];

  return (
    <div className={styles.wrapper}>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} sortedLinks={sortedLinks} />
      <ActiveTabContent activeTab={activeTab} sortedLinks={sortedLinks} />
    </div>
  );
};

export default ConfigurationFilesTabs;
