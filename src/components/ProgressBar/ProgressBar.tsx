import React, { useState, useRef, useEffect } from 'react';
import { useResizeWithMaxWidth } from '@hooks/useResizeWithMaxWidth';
import styles from './styles.module.scss';

interface IComponentProps {
  percents: number;
}

type TProps = IComponentProps;

const ProgressBar = ({ percents }: TProps) => {
  const MIN_PROGRESS_WIDTH = 52;
  const MOBILE_MEDIA_WIDTH = 470;

  const isMobile =  useResizeWithMaxWidth(MOBILE_MEDIA_WIDTH);
  const [progressWidth, setProgressWidth] = useState(MIN_PROGRESS_WIDTH);

  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barRef.current !== null) {
      const bar = barRef.current;

      const barClientWidth = bar.clientWidth;
      const barStyles = getComputedStyle(bar);
      const barContentWidth = barClientWidth - parseFloat(barStyles.paddingLeft) - parseFloat(barStyles.paddingRight);

      const onePercentWidth = (barContentWidth - MIN_PROGRESS_WIDTH) / 100;
      const currentProgressWidth = MIN_PROGRESS_WIDTH + onePercentWidth * percents;
      setProgressWidth(currentProgressWidth);
    }
  }, [percents, isMobile]);

  return (
    <div className={styles.bar} ref={barRef}>
      <div style={{ width: `${progressWidth}px` }} className={styles.progress}>
        <div className={styles.percents}>{percents}%</div>
      </div>
    </div>
  );
};

export default ProgressBar;
