import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { logoIcon, menuIcon } from './icons';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.menuIcon}>
        <img src={menuIcon} />
      </div>
      <div className={styles.logoIcon} onClick={() => navigate('/')}>
        <img src={logoIcon} />
      </div>
    </div>
  );
};
