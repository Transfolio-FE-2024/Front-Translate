import { IoMdCloseCircleOutline } from "react-icons/io";
import TextBundle from "../text-bundle/TextBundle";
import styles from "./TranslateTextWrap.module.scss"
import { useCallback, useEffect, useRef } from "react";

interface ITranslateTextWrap {
    focused : boolean;
    fontSize? : string; 
    fontFamily? : string;
    original : string;
    translated : string;
    offFocus : () => void;
    setOriginal : (original : string) => void;
    setTranslated : (translated : string) => void;
    moveNextContent : () => void;
    deleteContent : () => void
}

function TranslateTextWrap({focused = false, fontSize, fontFamily, original,translated, offFocus, setOriginal, setTranslated, moveNextContent, deleteContent} : ITranslateTextWrap) {
    const originalRef = useRef<HTMLTextAreaElement>(null);
    const translatedRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if(focused && originalRef.current !== null) originalRef.current.focus();
        offFocus();
    }, [focused, offFocus])

    const originalOnEnter = useCallback(() => {
        translatedRef.current?.focus();
    }, [])

    const translatedEnter = useCallback(() => {
        moveNextContent();
    }, [moveNextContent])

    return ( <div
        className={styles.textBundleContainer}
    >
        <div
            style={{ fontSize, fontFamily }}
            className={styles.textBundleSection}
        >
            <TextBundle
                ref={originalRef}
                fontSize={fontSize}
                fontFamily={fontFamily}
                value={original}
                setValue={
                    setOriginal
                }
                onEnterPressed={originalOnEnter}
            />
            <TextBundle
                ref={translatedRef}
                fontSize={fontSize}
                fontFamily={fontFamily}
                original={false}
                value={translated}
                setValue={setTranslated}
                onEnterPressed={translatedEnter}
            />
        </div>
        <div className={styles.deleteIconSection}>
            <IoMdCloseCircleOutline
                className={styles.deleteIcon}
                onClick={deleteContent}
            />
        </div>
    </div>)
}

export default TranslateTextWrap;