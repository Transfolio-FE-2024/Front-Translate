import styles from "./PageTitle.module.scss";
import { React } from "react";

const PageTitle: React.FC<{ mainTitle: string; subTitle: string }> = ({
  mainTitle,
  subTitle,
}) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>{mainTitle}</div>
        <div className={styles.subTitle}>{subTitle}</div>
      </div>
    </>
  );
};

export default PageTitle;
