import styles from './Home.module.scss';
import logoImage from '../../assets/images/home_logo.png';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <span className={styles.subTitle}>
        프리랜서 번역가도, 포트폴리오가 있다
      </span>
      <div className={styles.logo}>
        <img src={logoImage} alt='logo' />
      </div>

      <button
        className={styles.moveToCreatePortfolio}
        onClick={() => navigate('/mypage/portfolio')}
        style={{
          width: '78px',
          height: '30px',
          marginBottom: '24px',
          borderRadius: '100px',
          border: '1px solid #5B635E',
          cursor: 'pointer',
        }}
      >
        글쓰기
      </button>
      <button className={styles.grayButton}>로그인</button>
      <button className={styles.orangeButton}>시작하기</button>
    </div>
  );
}

export default Home;
