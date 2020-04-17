import React from 'react';
import classNames from 'classnames';
import CSS from 'csstype';
import { TButtonColor, TButtonType } from '@src/types/components/button';
import styles from './styles.module.scss';

interface IComponentProps {
  text: string;
  color?: TButtonColor;
  type?: TButtonType;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  style?: CSS.Properties;
}

type IProps = IComponentProps;

const Button = ({
  text,
  onClick,
  color = 'green',
  type = 'button',
  href = '',
  disabled = false,
  style = {},
}: IProps) => {
  const buttonClasses = classNames(styles.button, styles[`button--${color}`]);

  if (type === 'link') {
    return (
      <a className={buttonClasses} href={href} onClick={onClick} style={style}>
        {text}
      </a>
    );
  }

  return (
    <button className={buttonClasses} type="button" onClick={onClick} disabled={disabled} style={style}>
      {text}
    </button>
  );
};

export default Button;
