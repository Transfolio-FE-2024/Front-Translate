import styles from "./ThumbnailCardUnfolderable.module.scss";
import React, { useState } from "react";

const ThumbnailCardUnfolderable: React.FC<{
  original: string;
  translated: string;
  color: "green" | "orange";
  fontStyle?: string;
  isEditMode?: boolean;
}> = ({
  original,
  translated,
  color,
  fontStyle = "Pretendard",
  isEditMode,
}) => {
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
        <div className={styles.editableContent} contentEditable={isEditMode}>
          {original}
        </div>
      </div>
    </div>
  );
};

export default ThumbnailCardUnfolderable;
