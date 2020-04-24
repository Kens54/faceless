import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@components/Button';
import { TClouds } from '@src/types/reducers/page';
import { TPage } from '@src/types/routing';
import { SET_UP_PAGE_PATH } from '@src/constants/routing';
import { TButtonColor } from '@src/types/components/button';
import styles from './styles.module.scss';

export interface IActionProps {
  chooseCloud: (name: TClouds) => void;
}

interface IComponentProps {
  name: TClouds;
  buttonColor?: TButtonColor;
}

type TProps = IActionProps & IComponentProps;

const CloudItem = ({ name, buttonColor, chooseCloud }: TProps) => {
  const [redirect, setRedirect] = useState<TPage | null>(null);
  const onChooseCloud = () => {
    chooseCloud(name);

    setRedirect('/choose-auth');
  };

  if (redirect !== null) {
    return <Redirect to={`${SET_UP_PAGE_PATH}${redirect}`} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles['logo-container']}>
        <img src={`../../../../assets/img/cloudsLogo/${name}.png`} alt={name} />
      </div>
      <Button color={buttonColor} text="Set up" onClick={onChooseCloud} />
    </div>
  );
};

export default CloudItem;
