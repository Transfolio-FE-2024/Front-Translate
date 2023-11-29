import { useState } from "react";
import styles from "./Writers.module.scss";
import WriterThumbnail from "../writer-thumbnail/WriterThumbnail";

const buttons = ["언어", "전공", "문학", "기업"];
const writers = [1, 2, 3, 4, 5, 6];
const Writers = () => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>(0);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleSection}>Translator</div>
        <div className={styles.subTitleSection}>
          트랜스폴리오가 추천하는 번역가
        </div>

        <div className={styles.buttonsSection}>
          {buttons.map((button, index) => {
            return (
              <>
                <div
                  className={`${styles.button} ${
                    selectedButtonIndex === index ? styles.active : null
                  }`}
                  onClick={() => setSelectedButtonIndex(index)}
                  key={index}
                >
                  {button}
                </div>
              </>
            );
          })}
        </div>
        <div className={styles.writersSection}>
          {writers.map((writer) => (
            <WriterThumbnail />
          ))}
        </div>
      </div>
    </>
  );
};
export default Writers;
