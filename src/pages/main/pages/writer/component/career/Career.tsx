import React from "react";
import styles from "./Career.module.scss";

const Career: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* design */}
      <div className={styles.centerLine}>
        <div className={styles.bottomNot}></div>
      </div>
      {/* content */}
      <div className={styles.cardContainer}>
        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <div className={styles.date}>2024.01.01</div>
            <div className={styles.mainText}>センチメンタル・レディー</div>
            <div className={styles.rightArea}>
              <div className={styles.subText}>센티멘탈 레이디 번역</div>
              <div className={styles.writer}>야마</div>
            </div>
            <div className={styles.corner}></div>
          </div>
          <div className={styles.trophy}></div>
        </div>
        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <div className={styles.date}>2024.01.01</div>
            <div className={styles.mainText}>数年前の光景だって</div>
            <div className={styles.rightArea}>
              <div className={styles.subText}>러브레터 번역</div>
              <div className={styles.writer}>야마</div>
            </div>
            <div className={`${styles.corner} ${styles.folded}`}></div>
          </div>
          <div className={`${styles.trophy} ${styles.achieved}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Career;
