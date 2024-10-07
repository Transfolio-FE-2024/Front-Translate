import styles from "./Section.module.scss";

const Section: React.FC<{
  style?: React.CSSProperties;
  title?: JSX.Element | string;
  content: JSX.Element;
}> = ({ title, content, style }) => {
  return (
    <div className={styles.container} style={style}>
      {title && <div className={styles.titleSection}>{title}</div>}
      <div className={styles.contentSection}>{content}</div>
    </div>
  );
};

export default Section;
