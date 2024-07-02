import styles from "./ThumbnailCardFolderable.module.scss";
import React from "react";

const ThumbnailCardFolderable: React.FC<{
  original: string;
  translated: string;
  major?: string;
  writer: string;
  picked: number;
  preSave?: boolean;
  color: "green" | "orange";
  onClicked: () => void;
}> = ({
  original,
  translated,
  major,
  writer,
  picked,
  preSave = false,
  color,
  onClicked,
}) => {
  return (
    <div
      className={`${styles.container} ${styles.clickable} ${
        preSave ? styles.preSave : null
      }`}
      onClick={onClicked}
    >
      <div className={styles.indexSection}>
        <div
          className={`${styles.index} 
            ${
              preSave
                ? styles.indexInActive
                : color === "green"
                ? styles.green
                : styles.orange
            }
            `}
        />
      </div>
      <div className={styles.contentSection}>
        <div className={styles.originalSection}>{original}</div>
        <div className={styles.translatedSection}>{translated}</div>
      </div>
      <div className={styles.footerSection}>
        <div className={styles.nameSection}>
          {major}
          <br />
          {writer}
        </div>
        {!preSave && (
          <div className={styles.foldSection}>
            <div className={styles.pickedNumberContainer}>{picked}</div>
            <div
              className={`${styles.foldContainer} ${
                color === "green"
                  ? styles.borderTopGreen
                  : styles.borderTopOrange
              }`}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThumbnailCardFolderable;
