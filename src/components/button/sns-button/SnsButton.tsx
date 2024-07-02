import React from "react";
import styles from "./SnsButton.module.scss";

const SnsButton: React.FC<{
  img: any;
  title: string;
  onClicked: () => void;
}> = ({ img, title, onClicked }) => {
  return (
    <div className={styles.container} onClick={onClicked}>
      <div className={styles.imgSection}>
        <img src={img} className={styles.img} />
      </div>
      <div className={styles.titleSection}>{title}</div>
    </div>
  );
};

export default SnsButton;
