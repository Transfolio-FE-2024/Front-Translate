import { useState } from "react";
import styles from "./Writers.module.scss";
import WriterThumbnail from "../writer-thumbnail/WriterThumbnail";
import { useNavigate } from "react-router-dom";

const writers = [1, 2, 3, 4, 5, 6];
const Writers = () => {
  const navigate = useNavigate();
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>(0);
  return (
    <div className={styles.container}>
      <div className={styles.buttonsSection}>
        {["언어", "전공", "문학", "기업"].map((name, index) => {
          return (
            <div
              className={[
                styles.button,
                selectedButtonIndex === index ? styles.active : null,
              ].join(" ")}
              onClick={() => setSelectedButtonIndex(index)}
              key={index}
            >
              {name}
            </div>
          );
        })}
      </div>
      <div className={styles.writersSection}>
        {writers.map((writer, index) => (
          <div className={styles.writerThumbnailWrapper} key={index}>
            <WriterThumbnail
              key={writer}
              isFolded
              onClicked={() => navigate("/home/writer/kimhim00")}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Writers;
