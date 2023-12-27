import { useEffect, useState } from "react";
import TextBundle from "../text-bundle/TextBundle";
import styles from "./WritingContent.module.scss";
import { IoMdCloseCircleOutline } from "react-icons/io";

const WritingContent = () => {
  const [rows, setRows] = useState<number>(1);
  const [children, setChildren] = useState<any[]>([
    <div className={styles.textBundleContainer}>
      <div className={styles.textBundleSection}>
        <TextBundle />
        <TextBundle
          original={false}
          onEnterPressed={() => {
            setRows((prev) => prev + 1);
          }}
        />
      </div>
      <div className={styles.deleteIconSection}>
        <IoMdCloseCircleOutline className={styles.deleteIcon} />
      </div>
    </div>,
  ]);

  const handleDeleteIconClick = (targetIndex: number) => {
    console.log(targetIndex);
    setChildren((prev) => {
      const updatedChildren = [...prev];
      updatedChildren.splice(targetIndex, 1);
      return updatedChildren;
    });
  };

  useEffect(() => {
    if (rows === 1) {
      return;
    }

    setChildren((prev) => [
      ...prev,
      <div className={styles.textBundleContainer}>
        <div className={styles.textBundleSection}>
          <TextBundle />
          <TextBundle
            original={false}
            onEnterPressed={() => {
              setRows((prev) => prev + 1);
            }}
          />
        </div>
        <div className={styles.deleteIconSection}>
          <IoMdCloseCircleOutline
            className={styles.deleteIcon}
            onClick={() => handleDeleteIconClick(prev.length)}
          />
        </div>
      </div>,
    ]);
  }, [rows]);

  return (
    <>
      <div className={styles.container}>{children}</div>
    </>
  );
};

export default WritingContent;
