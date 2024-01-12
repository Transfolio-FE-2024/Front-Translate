import { useEffect, useState } from "react";
import TextBundle from "../text-bundle/TextBundle";
import styles from "./WritingContent.module.scss";
import { IoMdCloseCircleOutline } from "react-icons/io";

const WritingContent = () => {
  const [origianlContents, setOriginalContents] = useState<string[]>([""]);
  const [translatedContents, setTranslatedContents] = useState<string[]>([""]);

  const deleteIconClickHandler = (targetIndex: number) => {
    setOriginalContents((prev) => {
      const updated = [...prev];
      updated.splice(targetIndex, 1);
      return updated;
    });
    setTranslatedContents((prev) => {
      const updated = [...prev];
      updated.splice(targetIndex, 1);
      return updated;
    });
  };

  const enterPressHandler = (targetIndex: number) => {
    setOriginalContents((prev) => {
      const updated = [...prev];
      updated.splice(targetIndex + 1, 0, "");
      return updated;
    });
    setTranslatedContents((prev) => {
      const updated = [...prev];
      updated.splice(targetIndex + 1, 0, "");
      return updated;
    });
  };

  return (
    <>
      <div className={styles.container}>
        {origianlContents.map((content, index) => {
          return (
            <div className={styles.textBundleContainer} key={index}>
              <div className={styles.textBundleSection}>
                <TextBundle
                  key={`original-${index}`}
                  value={content}
                  setValue={(value) =>
                    setOriginalContents((prev) => {
                      const updated = [...prev];
                      updated[index] = value;
                      return updated;
                    })
                  }
                />
                <TextBundle
                  key={`translated-${index}`}
                  original={false}
                  value={translatedContents[index]}
                  setValue={(value) =>
                    setTranslatedContents((prev) => {
                      const updated = [...prev];
                      updated[index] = value;
                      return updated;
                    })
                  }
                  onEnterPressed={() => enterPressHandler(index)}
                />
              </div>
              <div className={styles.deleteIconSection}>
                <IoMdCloseCircleOutline
                  className={styles.deleteIcon}
                  onClick={() => deleteIconClickHandler(index)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WritingContent;
