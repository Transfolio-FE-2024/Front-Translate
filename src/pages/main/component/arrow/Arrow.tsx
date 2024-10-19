import React from "react";
import styles from "./Arrow.module.scss";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { className } from "@/util";

const Arrow: React.FC<{
  onClicked: () => void;
  left?: boolean;
}> = ({ onClicked, left = true }) => {
  return (
    <div
      className={className(styles.container, left ? styles.left : styles.right)}
      onClick={onClicked}
    >
      {left && <MdKeyboardArrowLeft className={styles.icon} />}
      {!left && <MdKeyboardArrowRight className={styles.icon} />}
    </div>
  );
};

export default Arrow;
