import styles from "./ThumbnailCardFolderable.module.scss";
import React from "react";

const ThumbnailCardFolderable: React.FC<{
  original: string;
  translated: string;
  writer: string;
  picked: number;
  active?: boolean;
}> = ({ original, translated, writer, picked, active = true }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.indexSection}>
          <div
            className={`${styles.index} ${
              active ? styles.indexActive : styles.indexInActive
            }`}
          ></div>
        </div>
        <div className={styles.contentSection}>
          <div className={styles.originalSection}>{original}</div>
          <div className={styles.translatedSection}>{translated}</div>
        </div>
        <div className={styles.footerSection}>
          <div className={styles.nameSection}>{writer}</div>
          <div className={styles.foldSection}>
            <div className={styles.pickedNumberContainer}>{picked}</div>
            <div className={styles.foldContainer}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThumbnailCardFolderable;
