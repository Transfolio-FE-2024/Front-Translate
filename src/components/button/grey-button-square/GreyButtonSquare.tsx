import React from "react";
import styles from "./GreyButtonSquare.module.scss";

const GreyButtonSquare: React.FC<{
  title: string;
  onClicked: () => void;
  enable?: boolean;
}> = ({ title, onClicked, enable = true }) => {
  return (
    <div
      className={`${styles.container} ${
        enable ? styles.enable : styles.disable
      }`}
      onClick={() => {
        if (enable) {
          onClicked();
        }
      }}
    >
      {title}
    </div>
  );
};

export default GreyButtonSquare;
