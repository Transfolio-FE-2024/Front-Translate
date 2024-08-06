import { useCallback, useRef, useState } from "react";
import PageTitle from "@/components/page-title/PageTitle";
import styles from "./Edit.module.scss";
import ThumbnailChangeable from "../portfolio/component/thumbnail-changeable/ThumbnailChangeable";
import TextField from "@/components/text-field/TextField";
import DropdownButton from "../portfolio/component/dropdown-button/DropdownButton";
import {
  areaOfInterest,
  preDefinedFontSize,
  preDefinedFontFamily,
  supportedTranslateLanguage,
  TF,
} from "@/util/const";
import { VscArrowSwap } from "react-icons/vsc";
import { RiErrorWarningLine } from "react-icons/ri";
import TextFieldLonger from "@/components/text-field/text-field-longer/TextFieldLonger";
import StyledTitle from "../portfolio/component/styled-title/StyledTitle";
import StyledDropdownButton from "../portfolio/component/styled-dropdown-button/StyledDropdownButton";
import WritingContent from "../portfolio/component/writing-content/WritingContent";
import GreyButtonSquare from "@/components/button/grey-button-square/GreyButtonSquare";
import MainButtonSquare from "@/components/button/main-button-square/MainButtonSquare";
import { useNavigate, useParams } from "react-router-dom";
import { ContentType } from "@/types/index";
import { MainCategoryType } from "@/types/index";
import { posts } from "@/util/sample-data";

function Edit() {
  const { contentId = "" } = useParams();
  const navigate = useNavigate();

  const post = posts.find((post) => post.id === contentId);

  // FIXME
  if (!post) {
    const err = new Error();
    err.name = TF.PAGE_ERROR.NOT_FOUND;
    throw err;
  }

  const indexRef = useRef<number>(post.content.length + 1);
  const [contents, setContents] = useState<ContentType[]>(
    post.content.length === 0
      ? [
          {
            id: indexRef.current++,
            focused: true,
            original: "",
            translated: "",
          } as ContentType,
        ]
      : post.content.map(
          (_content, index) =>
            ({
              id: index,
              focused: index === 0,
              original: _content.original,
              translated: _content.translated,
            } as ContentType)
        )
  );
  const [title, setTitle] = useState(post.title);
  const [information, setInformation] = useState(post.description);
  const [selectedOriginLanguage, setSelectedOriginLanguage] = useState<
    undefined | string
  >(post.language.original);
  const [selectedTranslatedLanguage, setSelectedTranslatedLanguage] = useState<
    undefined | string
  >(post.language.translated);
  const [selectedMainCatetory, setSelectedMainCategory] = useState<
    MainCategoryType | undefined
  >(post.category.major as MainCategoryType);
  const [selectedSubCatetory, setSelectedSubCategory] = useState<
    string | undefined
  >(post.category.sub);
  const [author, setAuthor] = useState(post.author);
  const [selectedFontSize, setSelectedFontSize] = useState<string>(
    post.style.fontSize
  );
  const [selectedFontFamily, setSelectedFontFamily] = useState<string>(
    post.style.fontFamily
  );

  const offFocus = useCallback(() => {
    setContents((_contents) =>
      _contents.map((content) => ({
        ...content,
        focused: false,
      }))
    );
  }, []);

  const deleteContent = useCallback(
    (index: number) => () =>
      contents.length !== 1
        ? setContents(contents.filter((_1, _index) => index !== _index))
        : null,
    [contents]
  );

  const moveNextContent = useCallback(
    (index: number) => () => {
      if (index + 1 === contents.length) {
        const newContent = {
          id: indexRef.current++,
          focused: true,
          original: "",
          translated: "",
        };

        const temp = contents.map((content) => ({
          ...content,
          focused: false,
        }));
        setContents([...temp, newContent]);
      } else {
        const temp = contents.map((content, contentIndex) => ({
          ...content,
          focused: index + 1 === contentIndex,
        }));
        setContents(temp);
      }
    },
    [contents]
  );

  const setOriginal = useCallback(
    (index: number) => (original: string) =>
      setContents((_contents) =>
        _contents.map((_content, _index) =>
          index === _index
            ? {
                ..._content,
                original,
              }
            : _content
        )
      ),
    []
  );

  const setTranslated = useCallback(
    (index: number) => (translated: string) =>
      setContents((_contents) =>
        _contents.map((_content, _index) =>
          index === _index
            ? {
                ..._content,
                translated,
              }
            : _content
        )
      ),
    []
  );

  const changeTitle = useCallback((_title: string) => {
    setTitle(_title);
  }, []);

  const changeInformation = useCallback((_information: string) => {
    setInformation(_information);
  }, []);

  const changeAuthor = useCallback((_author: string) => {
    setAuthor(_author);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <PageTitle mainTitle={"Translator"} subTitle={post.translator.major} />

        <div className={styles.divider}></div>
        <div className={styles.thumbnailSection}>
          <div className={styles.thumbnailCardSection}>
            <ThumbnailChangeable
              title={title}
              fontFamily={selectedFontFamily}
            />
          </div>
          <div className={styles.thumbnailInfoSection}>
            <div className={styles.titleTextFieldSection}>
              <TextField
                value={title}
                onChange={changeTitle}
                placeholder="제목을 입력해주세요"
              />
              <div className={styles.titleDateSection}>2023.12.12</div>
            </div>
            <div className={styles.selectLanguageSection}>
              <div className={styles.dropdownSection}>
                <DropdownButton
                  title={
                    selectedOriginLanguage === undefined
                      ? "언어 선택"
                      : selectedOriginLanguage
                  }
                  values={supportedTranslateLanguage}
                  selectedValue={selectedOriginLanguage}
                  onValueClicked={(value) => setSelectedOriginLanguage(value)}
                />
              </div>
              <VscArrowSwap className={styles.arrowIcon} />
              <div className={styles.dropdownSection}>
                <DropdownButton
                  title={
                    selectedTranslatedLanguage === undefined
                      ? "언어 선택"
                      : selectedTranslatedLanguage
                  }
                  values={supportedTranslateLanguage}
                  selectedValue={selectedTranslatedLanguage}
                  onValueClicked={(value) =>
                    setSelectedTranslatedLanguage(value)
                  }
                />
              </div>
              {(selectedOriginLanguage !== undefined ||
                selectedTranslatedLanguage !== undefined) &&
                selectedOriginLanguage === selectedTranslatedLanguage && (
                  <div className={styles.warnTextSection}>
                    <RiErrorWarningLine className={styles.warnIcon} />
                    같은 언어는 선택할 수 없습니다.
                  </div>
                )}
            </div>
            <div className={styles.infoTextFieldSection}>
              <TextFieldLonger
                value={information}
                onChange={changeInformation}
                placeholder="작품 설명을 입력해주세요. (200자)"
                maxLength={200}
              />
            </div>
            <div className={styles.etcSection}>
              <div className={styles.etcTitleSection}>대분류</div>
              <div className={styles.dropdownSection}>
                <DropdownButton
                  title={
                    selectedMainCatetory === undefined
                      ? "대분류"
                      : selectedMainCatetory
                  }
                  values={Object.keys(areaOfInterest)}
                  selectedValue={selectedMainCatetory}
                  onValueClicked={(value) =>
                    setSelectedMainCategory(
                      value as MainCategoryType | undefined
                    )
                  }
                />
              </div>
              <div className={styles.etcTitleSection}>소분류</div>
              <div className={styles.dropdownSection}>
                <DropdownButton
                  title={
                    selectedSubCatetory === undefined
                      ? "소분류"
                      : selectedSubCatetory
                  }
                  values={
                    selectedMainCatetory !== undefined
                      ? areaOfInterest[selectedMainCatetory]
                      : []
                  }
                  selectedValue={selectedSubCatetory}
                  onValueClicked={(value) => setSelectedSubCategory(value)}
                />
              </div>
            </div>
            <div className={styles.etcSection}>
              <div className={styles.etcTitleSection}>작가</div>
              <div className={styles.divider}></div>
              <div className={styles.etcTitleSection}>
                <TextField
                  value={author}
                  onChange={changeAuthor}
                  placeholder="작가를 입력해주세요"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.writingSection}>
          <div className={styles.buttonsSection}>
            <div className={styles.buttonSection}>
              <DropdownButton
                title={<StyledTitle>글자 크기</StyledTitle>}
                values={preDefinedFontSize}
                selectedValue={selectedFontSize}
                onValueClicked={(value) => setSelectedFontSize(value)}
              />
            </div>
            <div className={styles.buttonSection}>
              <StyledDropdownButton
                title={<StyledTitle>서체 설정</StyledTitle>}
                options={Object.entries(preDefinedFontFamily).reduce(
                  (acc, [key, value]) => {
                    acc[value] = key;
                    return acc;
                  },
                  {} as { [key: string]: string }
                )}
                selectedOptionKey={selectedFontFamily}
                onOptionClicked={(key) => setSelectedFontFamily(key)}
              />
            </div>
          </div>
          <WritingContent
            contents={contents}
            fontSize={selectedFontSize}
            fontFamily={selectedFontFamily}
            offFocus={offFocus}
            deleteContent={deleteContent}
            moveNextContent={moveNextContent}
            setOriginal={setOriginal}
            setTranslated={setTranslated}
          />
          <div className={styles.mainButtonsSection}>
            <div className={styles.mainButtonSection}>
              <GreyButtonSquare title="임시 저장" onClicked={() => {}} />
            </div>
            <div className={styles.mainButtonDivider}></div>
            <div className={styles.mainButtonSection}>
              <MainButtonSquare
                title="제출하기"
                onClicked={() => {
                  navigate("/home/completion");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
