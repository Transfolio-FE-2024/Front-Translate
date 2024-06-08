import React, { useState, useEffect } from "react";
import styles from "./ThumbnailChangeable.module.scss";
import { styleKeyType } from "../styled-dropdown-button/types";
import StyledDropdownButton from "../styled-dropdown-button/StyledDropdownButton";
import { fontFamily, fontFamilyList } from "@/util/const";

const ThumbnailChangeable: React.FC<{
	title: string;
	titleFontFamily? : styleKeyType;
	changeTitleFontFamily: (titleFontFamily: styleKeyType) => void;
}> = ({ title, titleFontFamily, changeTitleFontFamily }) => {
	const [selectedFontFamily, setSelectedFontFamily] = useState<
		styleKeyType | undefined
	>(titleFontFamily);

	useEffect(() => {
		if (selectedFontFamily !== undefined)
			changeTitleFontFamily(selectedFontFamily);
	}, [selectedFontFamily, changeTitleFontFamily]);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.indexSection}>
					<div className={styles.indexContainer}>
						<div className={styles.index}></div>
					</div>
					<div className={styles.dropdownSection}>
						<StyledDropdownButton
							title={
								selectedFontFamily === undefined
									? "서체 설정"
									: selectedFontFamily
							}
							values={fontFamilyList}
							selectedValue={selectedFontFamily}
							onValueClicked={(value) =>
								setSelectedFontFamily(value)
							}
						/>
					</div>
					<div className={styles.indexContainer}></div>
				</div>
				<div
					style={
						selectedFontFamily !== undefined
							? { fontFamily: fontFamily[selectedFontFamily] }
							: {}
					}
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
