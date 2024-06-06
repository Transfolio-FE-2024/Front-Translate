import styles from "./StyledTitle.module.scss";

const StyledTitle: React.FC<{
	children: string;
}> = ({ children }) => {
	return <div className={styles.styledTitleContainer}>{children}</div>;
};

export default StyledTitle;
