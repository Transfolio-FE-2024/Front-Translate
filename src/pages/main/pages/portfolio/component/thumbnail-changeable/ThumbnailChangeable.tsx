import React, { useState } from "react";
import styles from "./ThumbnailChangeable.module.scss";
import ArrowDropdownButton from "../arrow-dropdown-button/ArrowDropdownButton";

const fontFamilyList = [
  "Pretendard",
  "Nanum Myeangjo",
  "Noto sans",
  "Nanum Barun Gothic",
];
const ThumbnailChangeable: React.FC<{ title: string }> = ({ title }) => {
  const [selectedFontFamily, setSelectedFontFamily] = useState<string | null>(
    null
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.indexSection}>
          <div className={styles.indexContainer}>
            <div className={styles.index}></div>
          </div>
          <div className={styles.dropdownSection}>
            <ArrowDropdownButton
              title={
                selectedFontFamily === null ? "서체 설정" : selectedFontFamily
              }
              values={fontFamilyList}
              selectedValue={selectedFontFamily}
              onValueClicked={(value) => setSelectedFontFamily(value)}
            />
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
