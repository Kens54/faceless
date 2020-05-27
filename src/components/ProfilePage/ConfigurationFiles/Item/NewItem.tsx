import React from 'react';
import { AxiosResponse } from 'axios';
import { get } from '@src/common/fetch';
import styles from './styles.module.scss';

interface IComponentProps {
  icon: string;
  link: string;
  title: string;
}

type TProps = IComponentProps;

const Item = ({ icon, link, title }: TProps) => {
  const handleClick = () => {
    get({
      method: link,
      successCallback: (res: AxiosResponse<string>) => {
        const xmltext = res.data;
        const virtualLink = document.createElement('a');

        const filename = `${title}.config.xml`;

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

  return (
    <li onClick={handleClick} className={styles.link}>
      <img className={styles.icon} src={`../../../../assets/img/platforms/${icon}.png`} alt={icon} />
      <span className={`${styles.text}`}>{title}</span>
    </li>
  );
};

export default Item;
