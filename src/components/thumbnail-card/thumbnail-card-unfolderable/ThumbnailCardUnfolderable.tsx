import styles from "./ThumbnailCardUnfolderable.module.scss";
import React from "react";

const ThumbnailCardUnfolderable: React.FC<{
  original: string;
  translated: string;
  active?: boolean;
}> = ({ original, translated, active = true }) => {
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
      </div>
    </>
  );
};

export default ThumbnailCardUnfolderable;
