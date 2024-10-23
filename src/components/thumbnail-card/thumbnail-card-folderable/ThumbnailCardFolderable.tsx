import { Link } from "react-router-dom";
import styles from "./ThumbnailCardFolderable.module.scss";
import React, { useState } from "react";
import { CategoryColor, className } from "@/util";

const ThumbnailCardFolderable: React.FC<{
  original: string;
  major?: string;
  writer: string;
  picked: number;
  preSave?: boolean;
  color: CategoryColor;
  href?: string;
  fontStyle?: string;
}> = ({
  original,
  major,
  writer,
  picked,
  preSave = false,
  color,
  href = "",
  fontStyle = "Pretendard",
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // 드래그 상태 초기화
  const handleMouseDown = () => setIsDragging(false);

  // 마우스 이동이 감지되면 드래그 상태로 변경
  const handleMouseMove = () => setIsDragging(true);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isDragging) e.preventDefault();
  };

  return (
    <Link
      to={href}
      draggable={false}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <div
        className={className(
          styles.container,
          styles.clickable,
          preSave ? styles.preSave : ""
        )}
      >
        <div className={styles.indexSection}>
          <div
            className={className(
              styles.index,
              preSave ? styles.indexInActive : styles[color]
            )}
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
                className={className(
                  styles.foldContainer,
                  styles[`borderTop-${color}`]
                )}
              ></div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ThumbnailCardFolderable;
