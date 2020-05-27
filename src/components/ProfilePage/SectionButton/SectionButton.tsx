import React from 'react';
import styles from './styles.module.scss';

interface IComponentProps {
  icon: string;
  text: string;
  href?: string;
  onClick?: () => void;
}

type TProps = IComponentProps;

const SectionButton = ({ icon, text, href, onClick }: TProps) => {
  return (
    <a href={href} onClick={onClick} className={styles.link}>
      <img className={styles.icon} src={`../../../assets/img/profile-section-button-icons/${icon}.png`} alt={icon} />
      <span className={styles.text}>{text}</span>
    </a>
  );
};

export default SectionButton;
