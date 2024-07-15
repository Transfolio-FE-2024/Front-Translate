import styles from "./ThumbnailCardUnfolderable.module.scss";
import React from "react";

const ThumbnailCardUnfolderable: React.FC<{
  original: string;
  translated: string;
  color: "green" | "orange";
  fontStyle?: string;
}> = ({ original, translated, color, fontStyle = "Pretendard" }) => {
  return (
    <div className={styles.container}>
      <div className={styles.indexSection}>
        <div
          className={`${styles.index} ${
            color === "green" ? styles.green : styles.orange
          }`}
        ></div>
      </div>
      <div className={styles.contentSection} style={{ fontFamily: fontStyle }}>
        <div className={styles.originalSection}>{original}</div>
        <div className={styles.translatedSection}>{translated}</div>
      </div>
    </div>
  );
};

export default ThumbnailCardUnfolderable;
