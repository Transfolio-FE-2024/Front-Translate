import React from "react";
import styles from "./ThumbnailChangeable.module.scss";
import ArrowDropdownButton from "../arrow-dropdown-button/ArrowDropdownButton";

const ThumbnailChangeable: React.FC<{ title: string }> = ({ title }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.indexSection}>
          <div className={styles.indexContainer}>
            <div className={styles.index}></div>
          </div>
          <div className={styles.dropdownSection}>
            <ArrowDropdownButton title="서체 설정" />
          </div>
          <div className={styles.indexContainer}></div>
        </div>
        <div className={styles.contentSection}>{title}</div>
        <div className={styles.footerSection}>@kimhim</div>
      </div>
    </>
  );
};

export default ThumbnailChangeable;
