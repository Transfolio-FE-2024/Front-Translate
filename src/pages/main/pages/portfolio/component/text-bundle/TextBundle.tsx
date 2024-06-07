import React from "react";
import styles from "./TextBundle.module.scss";
import TextAreaAutoResize from "react-textarea-autosize";

const TextBundle: React.FC<{
	original?: boolean;
	onEnterPressed?: () => void;
	value: string;
	setValue: (value: string) => void;
}> = ({ original = true, onEnterPressed = null, value, setValue }) => {
	const keyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();

			if (!original && onEnterPressed !== null) {
				onEnterPressed!();
			}
		}
	};

	return (
		<>
			<TextAreaAutoResize
				defaultValue={value}
				placeholder={
					original
						? "원본 문장을 입력해주세요"
						: "번역된 문장을 입력해주세요"
				}
				onChange={(e) => setValue(e.target.value)}
				autoFocus={original ? true : false}
				className={`${styles.textarea} ${
					original ? styles.original : null
				}`}
				onKeyDown={keyDownHandler}
			/>
		</>
	);
};

export default TextBundle;
