import { className } from "@/util";
import styles from "./MenuBar.module.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const MenuBar: React.FC<{
  setOpen: (value: boolean) => void;
}> = ({ setOpen }) => {
  const navigate = useNavigate();
  const [easeout, setEaseout] = useState<boolean>(false);
  const handleClose = () => {
    setEaseout(true);
    setTimeout(() => {
      setOpen(false);
    }, 350);
  };

  useEffect(() => {
    // 메뉴 열렸을 때, 스크롤 막기
    const overflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = overflow || "auto";
    };
  }, []);

  const logoutButtonClickHandler = () => {
    navigate("/");
  };

  return (
    <React.Fragment>
      <div className={styles.overlay} onClick={handleClose}></div>
      <div className={className(styles.container, easeout ? styles.hide : "")}>
        <div className={styles.content}>
          <div className={styles.infoSection}>
            <div className={styles.profilePhotoSection}>
              {/* <div className={styles.profilePhoto}>
              </div> */}
              <img
                className={styles.profilePhoto}
                src={`https://picsum.photos/seed/${Math.random()}/135/135`}
                width="135px"
                height="135px"
                alt="프로필 사진"
              />
            </div>
            <div className={styles.profileNameSection}>@ Kimhim</div>
            <div className={styles.portfolioSection}>
              <div
                className={styles.portfolioButton}
                onClick={() => {
                  navigate("/home/portfolio");
                  setOpen(false);
                }}
              >
                <div className={styles.portfolioButtonTitle}>포트폴리오</div>
                <div className={styles.portfolioButtonNumber}>4개</div>
              </div>
              <div className={styles.portfolioButton}>
                <div className={styles.portfolioButtonTitle}>경력</div>
                <div className={styles.portfolioButtonNumber}>6개</div>
              </div>
              <div className={styles.portfolioButton}>
                <div className={styles.portfolioButtonTitle}>접음</div>
                <div className={styles.portfolioButtonNumber}>2개</div>
              </div>
              <div className={styles.portfolioButton}>
                <div className={styles.portfolioButtonTitle}>커뮤니티</div>
                <div className={styles.portfolioButtonNumber}>3개</div>
              </div>
            </div>
          </div>
          <div className={styles.logoutButtonSection}>
            <div
              className={styles.logoutButton}
              onClick={logoutButtonClickHandler}
            >
              로그아웃
            </div>
          </div>
        </div>

        {/* 메뉴 닫기 버튼 */}
        <div className={styles.closeButtonSection}>
          <div className={styles.closeButton} onClick={handleClose}>
            <IoClose />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MenuBar;
