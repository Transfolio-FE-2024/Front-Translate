import { CategoryColor, className } from "@/util";
import styles from "./ThumbnailCardUnfolderable.module.scss";
import React, { useState } from "react";

const ThumbnailCardUnfolderable: React.FC<{
  content: string;
  color: CategoryColor;
  fontStyle?: string;
  isEditMode?: boolean;
  onChangeContent?: (value: string) => void;
}> = ({
  content,
  color,
  fontStyle = "Pretendard",
  isEditMode,
  onChangeContent = () => {},
}) => {
  const [editable, setEditable] = useState<boolean>();

  const handleFocus = () => {
    setEditable(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setEditable(false);
    }
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChangeContent(e.target.value);

  return (
    <div className={styles.container}>
      <div className={styles.indexSection}>
        <div className={className(styles.index, styles[color])}></div>
      </div>
      <div
        className={styles.contentSection}
        style={{ fontFamily: fontStyle }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
      >
        {isEditMode && editable ? (
          <textarea
            className={styles.editableContent}
            onChange={handleChangeValue}
          >
            {content}
          </textarea>
        ) : (
          <div className={styles.editableContent}>{content}</div>
        )}
      </div>
    </div>
  );
};

export default ThumbnailCardUnfolderable;
