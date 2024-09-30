import React from "react";
import styles from "./WriterThumbnail.module.scss";

const WriterThumbnail: React.FC<{
  isFolded: boolean;
  onClicked: () => void;
}> = ({ isFolded, onClicked }) => {
  return (
    <div className={styles.container} onClick={onClicked}>
      <div className={styles.content}>
        <div className={styles.bodySection}>
          <div className={styles.profileImgSection}>
            <div className={styles.profileImg}>
              <img
                src={`https://picsum.photos/seed/${Math.random()}/73/73`}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
          <div className={styles.writerTitleSection}>고전시 번역 전문가</div>
          <div className={styles.writerNameSection}>@kimhim00</div>
          <div className={styles.writerInfoSection}>
            {
              "고전시를 위주로 번역합니다.\n일본 고전시를 엮은 경력 다수\n있으며 일본 블로그를 운영합니다."
            }
          </div>
        </div>
        {isFolded && (
          <div className={styles.foldSection}>
            <div className={styles.fold}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WriterThumbnail;
