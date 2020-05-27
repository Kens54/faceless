import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import CSS from 'csstype';
import { TPage } from '@src/types/routing';
import { TButtonColor, TButtonType } from '@src/types/components/button';
import { SET_UP_PAGE_PATH } from '@src/constants/routing';
import styles from './styles.module.scss';

interface IComponentProps {
  text: string | React.ReactNode;
  color?: TButtonColor;
  type?: TButtonType;
  disabled?: boolean;
  href?: TPage | '/profile';
  onClick?: () => void;
  style?: CSS.Properties;
  className?: string;
}

type IProps = IComponentProps;

const Button = ({
  text,
  onClick,
  color = 'green',
  type = 'button',
  href = '/',
  disabled = false,
  style = {},
  className,
}: IProps) => {
  const buttonClasses = className || classNames(styles.button, styles[`button--${color}`]);

  if (type === 'link') {
    return (
      <a className={buttonClasses} href={href} onClick={onClick} style={style}>
        {text}
      </a>
    );
  }

  if (type === 'innerLink') {
    return (
      <Link className={buttonClasses} to={`${SET_UP_PAGE_PATH}${href}`} style={style} onClick={onClick}>
        {text}
      </Link>
    );
  }

  return (
    <button className={buttonClasses} type="button" onClick={onClick} disabled={disabled} style={style}>
      {text}
    </button>
  );
};

export default Button;
