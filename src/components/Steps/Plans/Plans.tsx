import React, { useEffect } from 'react';
import { AxiosResponse } from 'axios';
import Slider from 'react-slick';
import { TTariffsDataState } from '@src/types/reducers/api';
import { ISuccessTariffsResponse } from '@src/types/api/tariffs';
import { TButtonColor } from '@src/types/components/button';
import { get } from '@common/fetch';
import Private from '@src/HOCs/Private';
import Plan from './Plan';
import styles from './styles.module.scss';
import 'slick-carousel/slick/slick.css';
import '@components/Slider/styles.scss';

export interface IStateProps {
  tariffs: TTariffsDataState;
}

export interface IActionProps {
  setTariffsData: (tariffs: TTariffsDataState) => void;
}

type TProps = IStateProps & IActionProps;

const Plans = ({ tariffs, setTariffsData }: TProps) => {
  useEffect(() => {
    get({
      method: '/billing/tariffs',
      successCallback: (res: AxiosResponse<ISuccessTariffsResponse>) => {
        if (res.data.code === 200) {
          setTariffsData(res.data.payload);
        }
      },
    });
  }, [setTariffsData]);

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

  if (tariffs === null) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Pricing plans</h2>
      <div className={styles['plans-list']}>
        <Slider {...sliderSettings}>
          {tariffs.map((plan, key) => {
            const btnColor: TButtonColor = key % 2 === 0 ? 'green' : 'red';

            return (
              <Plan
                key={plan.id}
                id={plan.id}
                title={plan.name}
                price={plan.amount}
                currency={plan.currency}
                btnColor={btnColor}
              />
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Private(Plans);
