import { useCallback, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Edit.module.scss";
import PageTitle from "@/components/page-title/PageTitle";
import TextField from "@/components/text-field/TextField";
import TextFieldLonger from "@/components/text-field/text-field-longer/TextFieldLonger";
import { VscArrowSwap } from "react-icons/vsc";
import { RiErrorWarningLine } from "react-icons/ri";
import {
  areaOfInterest,
  preDefinedFontSize,
  preDefinedFontFamily,
  supportedTranslateLanguage,
  TF,
} from "@/util/const";
import { MainCategoryType, ContentType } from "@/types/index";
import { posts } from "@/util/sample-data";
import { className, getCategoryColor } from "@/util";
import ThumbnailCardUnfolderable from "@/components/thumbnail-card/thumbnail-card-unfolderable/ThumbnailCardUnfolderable";
import DropdownButton from "../portfolio/component/dropdown-button/DropdownButton";
import WritingContent from "../portfolio/component/writing-content/WritingContent";

const Edit = () => {
  const { contentId = "" } = useParams();
  const navigate = useNavigate();

  const post = posts.find((post) => post.id === contentId);

  // FIXME
  if (!post) {
    const err = new Error();
    err.name = TF.PAGE_ERROR.NOT_FOUND;
    throw err;
  }

  const indexRef = useRef<number>(1);
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

        <div className={styles.thumbnailSection}>
          <div className={styles.thumbnailCardSection}>
            <ThumbnailCardUnfolderable
              original={post.title}
              color={getCategoryColor(post.category.major)}
              fontStyle={selectedFontFamily}
              isEditMode
            />
          </div>
          <div className={styles.thumbnailInfoSection}>
            <div className={styles.titleTextFieldSection}>
              <TextField
                value={title}
                onChange={changeTitle}
                placeholder="제목을 입력해주세요"
              />
              <div className={styles.titleDateSection}>2024.07.01</div>
            </div>
            <div className={styles.selectLanguageSection}>
              <div className={className(styles.dropdownSection, styles.lang)}>
                <DropdownButton
                  title={
                    selectedOriginLanguage === undefined
                      ? "언어 선택"
                      : selectedOriginLanguage
                  }
                  dropdownOptions={supportedTranslateLanguage}
                  selectedOption={
                    selectedOriginLanguage
                      ? {
                          key: selectedOriginLanguage,
                          value: selectedOriginLanguage,
                        }
                      : undefined
                  }
                  onOptionClicked={(key) => setSelectedOriginLanguage(key)}
                  buttonStyle={{ width: "100%" }}
                />
              </div>
              <VscArrowSwap className={styles.arrowIcon} />
              <div className={className(styles.dropdownSection, styles.lang)}>
                <DropdownButton
                  title={
                    selectedTranslatedLanguage === undefined
                      ? "언어 선택"
                      : selectedTranslatedLanguage
                  }
                  dropdownOptions={supportedTranslateLanguage}
                  selectedOption={
                    selectedTranslatedLanguage
                      ? {
                          key: selectedTranslatedLanguage,
                          value: selectedTranslatedLanguage,
                        }
                      : undefined
                  }
                  onOptionClicked={(key) => setSelectedTranslatedLanguage(key)}
                  buttonStyle={{ width: "100%" }}
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
            <div className={styles.etcWrapper}>
              <div className={styles.etcItemContainer}>
                <div className={styles.etcItemTitle}>대분류</div>
                <div className={styles.etcItemContent}>
                  <div
                    className={className(
                      styles.dropdownSection,
                      styles.category
                    )}
                  >
                    <DropdownButton
                      title={
                        selectedMainCatetory === undefined
                          ? "대분류"
                          : selectedMainCatetory
                      }
                      dropdownOptions={Object.keys(areaOfInterest)}
                      selectedOption={
                        selectedMainCatetory
                          ? {
                              key: selectedMainCatetory,
                              value: selectedMainCatetory,
                            }
                          : undefined
                      }
                      onOptionClicked={(key) => {
                        setSelectedMainCategory(
                          key as MainCategoryType | undefined
                        );
                        setSelectedSubCategory(undefined);
                      }}
                      buttonStyle={{ textAlign: "left" }}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.etcItemContainer}>
                <div className={styles.etcItemTitle}>소분류</div>
                <div className={styles.etcItemContent}>
                  <div
                    className={className(
                      styles.dropdownSection,
                      styles.category
                    )}
                  >
                    <DropdownButton
                      title={
                        selectedSubCatetory === undefined
                          ? "소분류"
                          : selectedSubCatetory
                      }
                      dropdownOptions={
                        selectedMainCatetory !== undefined
                          ? areaOfInterest[selectedMainCatetory]
                          : []
                      }
                      selectedOption={
                        selectedSubCatetory
                          ? {
                              key: selectedSubCatetory,
                              value: selectedSubCatetory,
                            }
                          : undefined
                      }
                      onOptionClicked={(key) => setSelectedSubCategory(key)}
                      buttonStyle={{ textAlign: "left" }}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.etcItemContainer}>
                <div className={styles.etcItemTitle}>작가</div>
                <div className={styles.etcItemContent}>
                  <div className={styles.authorInputSection}>
                    <TextField
                      value={author}
                      onChange={changeAuthor}
                      placeholder="작가를 입력해주세요"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={styles.hr}
          style={{ marginTop: "34px", marginBottom: "15px" }}
        />

        <div className={styles.writingSection}>
          <div className={styles.buttonsSection}>
            <div className={className(styles.dropdownSection, styles.setting)}>
              <DropdownButton
                title={"글자 크기"}
                dropdownOptions={preDefinedFontSize}
                selectedOption={
                  selectedFontSize
                    ? {
                        key: selectedFontSize,
                        value: selectedFontSize,
                      }
                    : undefined
                }
                onOptionClicked={(key) => setSelectedFontSize(key)}
              />
            </div>
            <div className={className(styles.dropdownSection, styles.setting)}>
              <DropdownButton
                title={"서체 설정"}
                dropdownOptions={preDefinedFontFamily}
                selectedOption={
                  selectedFontFamily
                    ? {
                        key: selectedFontFamily,
                        value: preDefinedFontFamily[selectedFontFamily],
                      }
                    : undefined
                }
                onOptionClicked={(key) => setSelectedFontFamily(key)}
              />
            </div>
          </div>
          <div className={styles.writingContentSection}>
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
          </div>
          <div className={styles.mainButtonsSection}>
            <div className={styles.mainButtonSection}>
              <button
                className={styles.btnPreSave}
                onClick={() => alert("임시 저장 기능 미구현")}
              >
                임시저장
              </button>
            </div>
            <div className={styles.mainButtonSection}>
              <button
                className={styles.btnSubmit}
                onClick={() => navigate("/home/completion")}
              >
                제출하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
