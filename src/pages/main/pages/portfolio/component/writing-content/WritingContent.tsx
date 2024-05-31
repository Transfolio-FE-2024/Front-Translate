import { useState } from "react";
import TextBundle from "../text-bundle/TextBundle";
import styles from "./WritingContent.module.scss";
import { IoMdCloseCircleOutline } from "react-icons/io";

const WritingContent: React.FC<{
	fontSize: string | undefined;
	fontFamily: string | undefined;
}> = ({ fontSize, fontFamily }) => {
	const [origianlContents, setOriginalContents] = useState<string[]>([""]);
	const [translatedContents, setTranslatedContents] = useState<string[]>([
		"",
	]);
	const [targetIndex, setTargetIndex] = useState<number>(0);

	const deleteIconClickHandler = (targetIndex: number) => {
		if (origianlContents.length === 1 && translatedContents.length === 1) {
			return;
		}

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

		if (targetIndex === 0) {
			setTargetIndex(targetIndex);
		} else {
			setTargetIndex(targetIndex - 1);
		}
	};

	const enterPressHandler = (targetIndex: number) => {
		setTargetIndex(targetIndex + 1);
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
					if (
						targetIndex === index ||
						index === origianlContents.length - 1
					) {
						return (
							<div
								className={styles.textBundleContainer}
								key={index}
							>
								<div
									style={{ fontSize, fontFamily }}
									className={styles.textBundleSection}
								>
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
										onEnterPressed={() =>
											enterPressHandler(index)
										}
									/>
								</div>
								<div className={styles.deleteIconSection}>
									<IoMdCloseCircleOutline
										className={styles.deleteIcon}
										onClick={() =>
											deleteIconClickHandler(index)
										}
									/>
								</div>
							</div>
						);
					} else {
						return (
							<div
								key={index}
								className={styles.textBundleContainer}
							>
								<div className={styles.textBundleSection}>
									<div
										style={{ fontSize, fontFamily }}
										className={styles.originalTextInput}
										onClick={() => setTargetIndex(index)}
									>
										{content}
									</div>
									<div
										style={{ fontSize, fontFamily }}
										className={styles.translatedTextInput}
										onClick={() => setTargetIndex(index)}
									>
										{translatedContents[index]}
									</div>
								</div>
								<div className={styles.deleteIconSection}>
									<IoMdCloseCircleOutline
										className={styles.deleteIcon}
										onClick={() =>
											deleteIconClickHandler(index)
										}
									/>
								</div>
							</div>
						);
					}
				})}
			</div>
		</>
	);
};

export default WritingContent;
