import styles from "./MenuBar.module.scss";
import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";
import { IoPersonCircleOutline } from "react-icons/io5";

const MenuBar: React.FC<{
  setOpen: (value: boolean) => void;
}> = ({ setOpen }) => {
  const [easeout, setEaseout] = useState<boolean>(false);
  const overlayClickHandler = () => {
    setEaseout(true);
    setTimeout(() => {
      setOpen(false);
    }, 350);
  };

  return (
    <>
      <div className={styles.overlay} onClick={overlayClickHandler}></div>
      <div className={`${styles.container} ${easeout ? styles.hide : ""}`}>
        <div className={styles.content}>
          <div className={styles.infoSection}>
            <div className={styles.settingButtonSection}>
              <div className={styles.settingButtonIconSection}>
                <CiSettings className={styles.settingButtonIcon} />
              </div>
            </div>
            <div className={styles.profilePhotoSection}>
              {/* <div className={styles.profilePhoto}>
              </div> */}
              <IoPersonCircleOutline className={styles.profileIcon} />
            </div>
            <div className={styles.profileNameSection}>@ Kimhim</div>
            <div className={styles.portfolioSection}>
              <div className={styles.portfolioButton}>
                <div className={styles.portfolioButtonTitle}>포트폴리오</div>
                <div className={styles.portfolioButtonNumber}>4개</div>
              </div>
              <div className={styles.portfolioButton}>
                <div className={styles.portfolioButtonTitle}>경력</div>
                <div className={styles.portfolioButtonNumber}>4개</div>
              </div>
              <div className={styles.portfolioButton}>
                <div className={styles.portfolioButtonTitle}>접음</div>
                <div className={styles.portfolioButtonNumber}>4개</div>
              </div>
              <div className={styles.portfolioButton}>
                <div className={styles.portfolioButtonTitle}>커뮤니티</div>
                <div className={styles.portfolioButtonNumber}>4개</div>
              </div>
            </div>
          </div>
          <div className={styles.logoutButtonSection}>
            <div className={styles.logoutButton}>로그아웃</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
