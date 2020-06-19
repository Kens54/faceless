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

  const openFileOnFrame = (blob: Blob): void => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onload = () => {
      const { result } = reader;
      if (typeof result === 'string') {
        const newWindow = window.open('');

        if (newWindow) {
          newWindow.onload = () => {
            newWindow.document.write(
              `<iframe width="100%" height="100%" src="${result}" style="border: none;"></iframe>`,
            );
          };
        }

        URL.revokeObjectURL(result);
      }
    };
  };

  const downloadFile = (blob: Blob): void => {
    const blobUrl = URL.createObjectURL(blob);
    const virtualLink = document.createElement('a');

    virtualLink.href = blobUrl;
    virtualLink.download = link.fileName;
    virtualLink.click();
    URL.revokeObjectURL(blobUrl);
  };

  const handleClick = () => {
    get({
      method: link.apiLink,
      options: {
        responseType,
      },
      successCallback: (res: AxiosResponse<any>) => {
        const { data } = res;

        const isIos = window.navigator.userAgent.search(/(iPhone|iPad)/) > -1;

        const blob = responseType === 'blob' ? data : new Blob([data], { type: fileType });

        if (isIos || link.ext === 'png') {
          openFileOnFrame(blob);
        } else {
          downloadFile(blob);
        }
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
