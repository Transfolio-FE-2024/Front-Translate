import { useCallback, useRef, useState } from "react";
import TranslateTextWrap from "../translation-text-wrap/TranslateTextWrap";
import styles from "./WritingContent.module.scss";

type ContentType =
	{
		id : number;
		focused: boolean;
		original : string;
		translated : string;
	}

const WritingContent: React.FC<{
	fontSize: string | undefined;
	fontFamily: string | undefined;
}> = ({ fontSize, fontFamily }) => {
	const indexRef = useRef<number>(1);
	const [contents, setContents] = useState<ContentType[]>([{
		id : indexRef.current++,
		focused : true,
		original : "",
		translated : "",
	}]);

	const deleteContent = useCallback((index : number) => () => contents.length !== 1 ? setContents(contents.filter((_1, _index) => index !== _index)) : null, [contents])

	const moveNextContent = useCallback((index : number) => () => {
		if(index + 1 === contents.length) {
			const newContent = {
				id : indexRef.current++,
				focused: true,
				original : "",
				translated : "",
			}

			const temp = contents.map(content => ({...content, focused : false}));
			setContents([...temp, newContent]);
		} else {
			const temp = contents.map((content, contentIndex) => ({
				...content,
				focused : index + 1 === contentIndex
			}))
			setContents(temp);
		}
	}, [contents])
	
	const setOriginal = useCallback((index: number) => (original: string) => 
		setContents(contents.map((_content, _index) => (index === _index ? {
			..._content,
			original
		} : _content))), [contents]);

	const setTranslated = useCallback((index: number) => (translated: string) => 
		setContents(contents.map((_content, _index) => (index === _index ? {
			..._content,
			translated
		} : _content))), [contents]);
	
	return (
		<>
			<div className={styles.container}>
				{contents.map((content, index) => 
							<TranslateTextWrap 
								key={content.id}
								focused={content.focused}
								fontSize={fontSize} fontFamily={fontFamily}
								original={content.original} translated={content.translated} 
								setOriginal={setOriginal(index)} setTranslated={setTranslated(index)} 
								moveNextContent={moveNextContent(index)} deleteContent={deleteContent(index)}
							/>
				)}
			</div>
		</>
	);
};

export default WritingContent;
