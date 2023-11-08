import React from "react";
import styles from "./MainButtonRound.module.scss";

const MainButtonRound: React.FC<{
  title: string;
  onClicked: () => void;
  enable?: boolean;
}> = ({ title, onClicked, enable = true }) => {
  return (
    <div
      className={`${styles.container} ${
        enable ? styles.enable : styles.disable
      }`}
      onClick={onClicked}
    >
      {title}
    </div>
  );
};

export default MainButtonRound;
