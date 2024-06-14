import React from "react";
import styles from "./ThumbnailChangeable.module.scss";

const ThumbnailChangeable: React.FC<{
	title: string;
	fontFamily : string | undefined
}> = ({ title, fontFamily }) => {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.indexSection}>
					<div className={styles.indexContainer}>
						<div className={styles.index}></div>
					</div>
					
					<div className={styles.indexContainer}></div>
				</div>
				<div
					style={{fontFamily}}
					className={styles.contentSection}
				>
					{title}
				</div>
				<div className={styles.footerSection}>@kimhim</div>
			</div>
		</>
	);
};

export default ThumbnailChangeable;
