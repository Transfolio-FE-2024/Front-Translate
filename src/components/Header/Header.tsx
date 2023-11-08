import styles from './Header.module.scss';
import { logoIcon, menuIcon } from './icons';

export const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.menuIcon}>
        <img src={menuIcon} />
      </div>
      <div className={styles.logoIcon}>
        <img src={logoIcon} />
      </div>
    </div>
  );
};
