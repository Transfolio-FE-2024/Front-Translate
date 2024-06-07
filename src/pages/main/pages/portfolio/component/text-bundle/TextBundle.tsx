import React, { useMemo, useRef } from "react";
import styles from "./TextBundle.module.scss";
import TextAreaAutoResize from "react-textarea-autosize";

const TextBundle: React.FC<{
	original?: boolean;
	onEnterPressed?: () => void;
	value: string;
	setValue: (value: string) => void;
}> = ({ original = true, onEnterPressed = null, value, setValue }) => {
	const ref = useRef<HTMLDivElement>(null);
	const width = useMemo(() => {
		console.log(ref.current?.offsetWidth);

		if(ref.current === null) return 75+"px"
		if(value.length === 0) return 75+"px"
		return ref.current.offsetWidth+50+"px"
	}, [value, ref.current])
	const keyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();

			if (onEnterPressed !== null) {
				onEnterPressed!();
			}
		}
	};

	return (
		<>
			<div className={styles.hiddenDiv}>
				<span ref={ref}>
						{value}
				</span>
			</div>
			
			<TextAreaAutoResize
				style={{
					width,
					
				}}
				
				defaultValue={value}
				placeholder={
					original
						? "번역 전"
						: "번역 후"
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
