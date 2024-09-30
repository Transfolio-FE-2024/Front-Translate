import { Link } from "react-router-dom";
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
  href?: string;
  fontStyle?: string;
}> = ({
  original,
  translated,
  major,
  writer,
  picked,
  preSave = false,
  color,
  href = "",
  fontStyle = "Pretendard",
}) => {
  return (
    <Link to={href}>
      <div
        className={`${styles.container} ${styles.clickable} ${
          preSave ? styles.preSave : null
        }`}
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
        <div
          className={styles.contentSection}
          style={{ fontFamily: fontStyle }}
        >
          {original}
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
    </Link>
  );
};

export default ThumbnailCardFolderable;
