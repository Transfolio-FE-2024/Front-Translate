import styles from "./WriterThumbnail.module.scss";
import { IoPersonCircleOutline } from "react-icons/io5";

const WriterThumbnail = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.bodySection}>
            <div className={styles.profileImgSection}>
              <div className={styles.profileImg}>
                <IoPersonCircleOutline className={styles.profileIcon} />
              </div>
            </div>
            <div className={styles.writerTitleSection}>고전시 번역 전문가</div>
            <div className={styles.writerNameSection}>@doom</div>
            <div className={styles.writerInfoSection}>
              고전시를 위주로 번역합니다. 일본 고전시를 엮은 경력 다수 있으며
              일본 블로그를 운영합니다.
            </div>
          </div>
          <div className={styles.foldSection}>
            <div className={styles.fold}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WriterThumbnail;
