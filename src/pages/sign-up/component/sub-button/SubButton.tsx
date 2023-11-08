import React from "react";
import styles from "./SubButton.module.scss";

const SubButton: React.FC<{
  title: string;
  onClick: () => void;
}> = ({ title, onClick }) => {
  return (
    <>
      <div className={styles.container} onClick={onClick}>
        {title}
      </div>
    </>
  );
};

export default SubButton;
