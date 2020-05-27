import React from 'react';
import { AxiosResponse } from 'axios';
import { get } from '@src/common/fetch';
import styles from './styles.module.scss';

interface IComponentProps {
  link: string;
}

type TProps = IComponentProps;

const Item = ({ link }: TProps) => {
  let typeLink: 'windows' | 'mac' | 'android' | 'ios' | null = null;

  if (link.indexOf('/windows/') !== -1) {
    typeLink = 'windows';
  } else if (link.indexOf('/ios/') !== -1) {
    typeLink = 'ios';
  } else if (link.indexOf('/macos/') !== -1) {
    typeLink = 'mac';
  } else if (link.indexOf('/android/') !== -1) {
    typeLink = 'android';
  }

  const handleClick = () => {
    get({
      method: link,
      successCallback: (res: AxiosResponse<string>) => {
        const xmltext = res.data;
        const virtualLink = document.createElement('a');

        const filename = `${typeLink}.config.xml`;

        const bb = new Blob([xmltext], { type: 'text/plain' });

        virtualLink.setAttribute('href', window.URL.createObjectURL(bb));
        virtualLink.setAttribute('download', filename);

        virtualLink.dataset.downloadurl = ['text/plain', virtualLink.download, virtualLink.href].join(':');
        virtualLink.draggable = true;
        virtualLink.classList.add('dragout');

        virtualLink.click();
      },
    });
  };

  if (typeLink === null) {
    return null;
  }

  return (
    <li onClick={handleClick} className={styles.link}>
      <img className={styles.icon} src={`../../../../assets/img/platforms/${typeLink}.png`} alt={typeLink} />
      <span className={`${styles.text} ${styles[typeLink]}`}>{typeLink}</span>
    </li>
  );
};

export default Item;
