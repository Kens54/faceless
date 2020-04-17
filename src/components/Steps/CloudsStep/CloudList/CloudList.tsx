import React from 'react';
import Slider from 'react-slick';
import { TClouds } from '@src/types/reducers/page';
import { TButtonColor } from '@src/types/components/button';
import CloudItem from '../CloudItem';
import styles from './styles.module.scss';
import 'slick-carousel/slick/slick.css';
import '@components/Slider/styles.scss';

interface ICloudItem {
  name: TClouds;
  buttonColor?: TButtonColor;
}

const cloudsList: ICloudItem[] = [
  {
    name: 'aws',
  },
  {
    name: 'aws1',
  },
  {
    name: 'aws2',
  },
];

const CloudList = () => {
  const sliderSettings = {
    className: 'slider variable-width custom-slider',
    dots: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    variableWidth: true,
    arrows: false,
  };

  return (
    <div className={styles.container}>
      <Slider {...sliderSettings}>
        {cloudsList.map(item => (
          <CloudItem key={item.name} name={item.name} buttonColor={item.buttonColor} />
        ))}
      </Slider>
    </div>
  );
};

export default CloudList;
