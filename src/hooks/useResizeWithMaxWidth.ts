import { useState, useEffect } from 'react';
import { useWindowSize } from './useWindowSize';

export const useResizeWithMaxWidth = ( maxWidth: number) => {
  const windowWidth = useWindowSize().width;

  const [lessThenMaximumWidth, toggleLessThenMaximumWidth] = useState(() => windowWidth <= maxWidth);

  useEffect(() => {
    if ((windowWidth > maxWidth && lessThenMaximumWidth) || (windowWidth <= maxWidth && !lessThenMaximumWidth)) {
      toggleLessThenMaximumWidth(!lessThenMaximumWidth);
    }
  }, [maxWidth, lessThenMaximumWidth, windowWidth]);

  return lessThenMaximumWidth;
};
