import TextBundle from "../text-bundle/TextBundle";
import styles from "./WritingContent.module.scss";

const WritingContent = () => {
  return (
    <>
      <div className={styles.container}>
        <TextBundle />
        <TextBundle original={false} />
      </div>
    </>
  );
};

export default WritingContent;
