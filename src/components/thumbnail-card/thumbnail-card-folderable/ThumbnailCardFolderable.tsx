import styles from "./ThumbnailCardFolderable.module.scss";
import React from "react";

const ThumbnailCardFolderable: React.FC<{
  original: string;
  translated: string;
  writer: string;
  picked: number;
  preSave?: boolean;
  onClicked: () => void;
}> = ({
  original,
  translated,
  writer,
  picked,
  preSave = false,
  onClicked,
}) => {
  return (
    <>
      <div
        className={`${styles.container} ${styles.clickable} ${preSave ? styles.preSave : null}` }
        onClick={onClicked}
      >
        <div className={styles.indexSection}>
          <div
            className={`${styles.index} ${
              preSave ? styles.indexInActive : styles.indexActive
            }`}
          ></div>
        </div>
        <div className={styles.contentSection}>
          <div className={styles.originalSection}>{original}</div>
          <div className={styles.translatedSection}>{translated}</div>
        </div>
        <div className={styles.footerSection}>
          <div className={styles.nameSection}>{writer}</div>
          {!preSave && <div className={styles.foldSection}>
            <div className={styles.pickedNumberContainer}>{picked}</div>
            <div className={styles.foldContainer}></div>
          </div>}
        </div>
      </div>
    </>
  );
};

export default ThumbnailCardFolderable;
