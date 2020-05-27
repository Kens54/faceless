import React from 'react';
import Item from './Item';
import styles from './styles.module.scss';

interface IComponentProps {
  configsLinks: string[];
  setupId: number;
}

type TProps = IComponentProps;

interface ILink {
  link: string;
  linkText: string;
}

interface ISortedLinks {
  title: string;
  icon: string;
  links: ILink[];
}

const ConfigurationFiles = ({ configsLinks, setupId }: TProps) => {
  const windowsLinks: ISortedLinks = { title: 'Windows', icon: 'windows', links: [] };
  const macLinks: ISortedLinks = { title: 'Mac', icon: 'mac', links: [] };
  const androidLinks: ISortedLinks = { title: 'Android', icon: 'android', links: [] };
  const iosLinks: ISortedLinks = { title: 'IOS', icon: 'ios', links: [] };

  configsLinks.forEach(item => {
    const linkText = item.slice(`/me/vpn/${setupId}/configs-custom/`.length);

    if (
      item.includes('ipsec/p12') ||
      item.includes('ipsec/p12pw') ||
      item.includes('ipsec/cacert') ||
      item.includes('ipsec/sswanconfig')
    ) {
      windowsLinks.links.push({ link: item, linkText });
    } else if (item.includes('macos/wireguard')) {
      macLinks.links.push({ link: item, linkText });
    } else if (item.includes('openvpn')) {
      androidLinks.links.push({ link: item, linkText });
    } else if (item.includes('os/ikev2') || item.includes('ios/wireguard')) {
      iosLinks.links.push({ link: item, linkText });
    }
  });

  const sortedLinks = [windowsLinks, macLinks, androidLinks, iosLinks];

  return (
    <ul className={styles['paltforms-container']}>
      {sortedLinks.map(paltform => (
        <li key={paltform.title} className={styles['platform-item']}>
          <span className={styles['platform-title']}>{paltform.title}</span>
          <ul className={styles['links-list']}>
            {paltform.links.map(item => (
              <Item icon={paltform.icon} link={item.link} title={item.linkText} key={item.link} />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default ConfigurationFiles;
