import React from "react";
import styles from "./Footer.module.scss";
import FooterLogo from "./components/FooterLogo";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <div className={styles.top}>
          <div className={styles.logo}>
            <FooterLogo />
          </div>
          <div className={styles.slogan}>
            프리랜서 번역가도 포트폴리오가 있다
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.since}>@2022</div>
        </div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.column}>
          <div className={styles.item}>
            <Link to="https://naver.com" target="_blank">
              이용약관
            </Link>
          </div>
          <div className={styles.item}>
            <Link to="https://naver.com" target="_blank">
              카카오 개인정보 처리방침
            </Link>
          </div>
          <div className={styles.item}>
            <Link to="https://naver.com" target="_blank">
              청소년 보호정책
            </Link>
          </div>
          <div className={styles.item}>
            <Link to="https://naver.com" target="_blank">
              운영정책
            </Link>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.item}>
            <Link to="https://naver.com" target="_blank">
              공지사항
            </Link>
          </div>
          <div className={styles.item}>
            <Link to="https://naver.com" target="_blank">
              카카오톡 채널
            </Link>
          </div>
          <div className={styles.item}>
            <Link to="https://naver.com" target="_blank">
              인스타그램
            </Link>
          </div>
          <div className={styles.item}>
            <Link to="https://naver.com" target="_blank">
              페이스북
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
