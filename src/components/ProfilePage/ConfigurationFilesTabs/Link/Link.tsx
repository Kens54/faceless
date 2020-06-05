import React from 'react';
import { AxiosResponse } from 'axios';
import { get } from '@src/common/fetch';
import { ILink } from '../types';
import styles from './styles.module.scss';

interface IComponentProps {
  link: ILink;
  linkName?: string;
}

type TProps = IComponentProps;

const Link = ({ link, linkName }: TProps) => {
  const getFileType = () => {
    switch (link.ext) {
      case 'png':
        return 'image/png';
      default:
        return 'text/plain';
    }
  };

  const getResponseType = () => {
    switch (link.ext) {
      case 'png':
      case 'conf':
      case 'pem':
      case 'mobileconfig':
      case 'ovpn':
      case 'p12':
        return 'blob';
      case 'txt':
        return 'text';
      default:
        return 'json';
    }
  };

  const fileType = getFileType();
  const responseType = getResponseType();

  const handleClick = () => {
    get({
      method: link.apiLink,
      options: {
        responseType,
      },
      successCallback: (res: AxiosResponse<any>) => {
        const { data } = res;
        const virtualLink = document.createElement('a');
        const blob = responseType === 'blob' ? data : new Blob([data], { type: fileType });

        virtualLink.href = URL.createObjectURL(blob);
        virtualLink.download = link.fileName;
        virtualLink.click();

        URL.revokeObjectURL(virtualLink.href);
      },
    });
  };

  const linkTitle = linkName || 'link';

  return (
    <button type="button" onClick={handleClick} className={styles.link}>
      {linkTitle}
    </button>
  );
};

export default Link;
