import React, { useCallback, useMemo, useRef } from "react";
import styles from "./TextBundle.module.scss";
import TextAreaAutoResize from "react-textarea-autosize";

interface ITextBundle {
	fontSize? : string;
	fontFamily?: string;
	original?: boolean;
	value: string;
	setValue: (value: string) => void;
	onEnterPressed: () => void;
}

const TextBundle = React.forwardRef<HTMLTextAreaElement, ITextBundle>(({fontSize, fontFamily, original = true, value, setValue, onEnterPressed}, ref) => {
	const divRef = useRef<HTMLDivElement>(null);

	const width = useMemo(() => {
		if(divRef.current === null && value.length === 0 ) {	
			return "100px";
		}

		if(divRef.current === null) return "0px";

		const span = divRef.current?.firstChild as HTMLSpanElement;
		if(fontFamily !== undefined) span.style.setProperty("font-family", fontFamily);
		if(fontSize !== undefined) span.style.setProperty("font-size", fontSize);
		span.innerText = value==="" ? "번역 전 " : value

		console.log(span.offsetWidth)
		return Math.floor(span.offsetWidth)+10+"px"
	}, [value, fontSize, fontFamily, divRef.current])

	const onPaste = useCallback((e: React.ClipboardEvent) => {
		setValue(e.clipboardData.getData("text/plain"))
	}, [setValue])

	const keyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();

			onEnterPressed();
		}
	};

	return (
		<>
			<div style={{fontSize, fontFamily}} className={styles.hiddenDiv} ref={divRef}>
				<span ></span>
			</div>
			{width !== "0px" && <TextAreaAutoResize
				ref={ref}
				style={{
					width,
					fontSize, fontFamily,
					boxSizing:"content-box"
				}}
				defaultValue={value}
				placeholder={
					original
						? "번역 전"
						: "번역 후"
				}
				onPaste={onPaste}
				onChange={(e) => setValue(e.target.value)}
				autoFocus={original}
				className={`${styles.textarea} ${
					original ? styles.original : null
				}`}
				onKeyDown={keyDownHandler}
			/>}
		</>
	);
});

export default TextBundle;
