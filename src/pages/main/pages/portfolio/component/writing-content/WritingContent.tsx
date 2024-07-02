import TranslateTextWrap from "../translation-text-wrap/TranslateTextWrap";
import styles from "./WritingContent.module.scss";

type ContentType = {
  id: number;
  focused: boolean;
  original: string;
  translated: string;
};

const WritingContent: React.FC<{
  contents: ContentType[];
  fontSize: string | undefined;
  fontFamily: string | undefined;
  offFocus: () => void;
  deleteContent: (index: number) => () => void;
  moveNextContent: (index: number) => () => void;
  setOriginal: (index: number) => (original: string) => void;
  setTranslated: (index: number) => (translated: string) => void;
}> = ({
  contents,
  fontSize,
  fontFamily,
  offFocus,
  deleteContent,
  moveNextContent,
  setOriginal,
  setTranslated,
}) => {
  return (
    <div className={styles.container}>
      {contents.map((content, index) => (
        <TranslateTextWrap
          key={content.id}
          focused={content.focused}
          fontSize={fontSize}
          fontFamily={fontFamily}
          original={content.original}
          translated={content.translated}
          offFocus={offFocus}
          setOriginal={setOriginal(index)}
          setTranslated={setTranslated(index)}
          moveNextContent={moveNextContent(index)}
          deleteContent={deleteContent(index)}
        />
      ))}
    </div>
  );
};

export default WritingContent;
