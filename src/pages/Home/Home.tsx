import styles from './Home.module.scss';
import logoImage from '../../assets/images/home_logo.png';

function Home() {
  return (
    <div className={styles.container}>
      <span className={styles.subTitle}>
        프리랜서 번역가도, 포트폴리오가 있다
      </span>
      <div className={styles.logo}>
        <img src={logoImage} />
      </div>

      <button className={styles.grayButton}>로그인</button>
      <button className={styles.orangeButton}>시작하기</button>
    </div>
  );
}

export default Home;
