import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Portfolio.module.scss";
import PageTitle from "@/components/page-title/PageTitle";
import TextField from "@/components/text-field/TextField";
import TextFieldLonger from "@/components/text-field/text-field-longer/TextFieldLonger";
import GreyButtonSquare from "@/components/button/grey-button-square/GreyButtonSquare";
import MainButtonSquare from "@/components/button/main-button-square/MainButtonSquare";
import ThumbnailChangeable from "./component/thumbnail-changeable/ThumbnailChangeable";
import DropdownButton from "./component/dropdown-button/DropdownButton";
import StyledDropdownButton from "./component/styled-dropdown-button/StyledDropdownButton";
import WritingContent from "./component/writing-content/WritingContent";
import StyledTitle from "./component/styled-title/StyledTitle";
import { VscArrowSwap } from "react-icons/vsc";
import { RiErrorWarningLine } from "react-icons/ri";
import {
  areaOfInterest,
  preDefinedFontSize,
  preDefinedFontFamily,
  supportedTranslateLanguage,
} from "@/util/const";
import { MainCategoryType, ContentType } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/interface";
import boardApi from "@/api/boardApi";

const Portfolio = () => {
  const indexRef = useRef<number>(1);
  const [contents, setContents] = useState<ContentType[]>([
    {
      id: indexRef.current++,
      focused: true,
      original: "",
      translated: "",
    },
  ]);
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [information, setInformation] = useState<string>("");
  const [selectedOriginLanguage, setSelectedOriginLanguage] = useState<
    string | undefined
  >();
  const [selectedTranslatedLanguage, setSelectedTranslatedLanguage] = useState<
    string | undefined
  >(undefined);
  const [selectedMainCatetory, setSelectedMainCategory] = useState<
    MainCategoryType | undefined
  >();
  const [selectedSubCatetory, setSelectedSubCategory] = useState<
    string | undefined
  >();
  const [author, setAuthor] = useState<string>("");
  const [selectedFontSize, setSelectedFontSize] = useState<string>(
    preDefinedFontSize[0]
  );
  const [selectedFontFamily, setSelectedFontFamily] = useState<string>(
    Object.keys(preDefinedFontFamily)[0]
  );
  //
  const { mutate: submitPost } = useMutation({
    mutationFn: (post: Post) => boardApi.createBoard(post),
    onSuccess: () => navigate("/home/completion"),
    onError: (e: Error) => alert(e.message),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      setContents(
        contents.map((_content, _index) =>
          index === _index
            ? {
                ..._content,
                original,
              }
            : _content
        )
      ),
    [contents]
  );

  const setTranslated = useCallback(
    (index: number) => (translated: string) =>
      setContents(
        contents.map((_content, _index) =>
          index === _index
            ? {
                ..._content,
                translated,
              }
            : _content
        )
      ),
    [contents]
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <PageTitle
          mainTitle={"Translator"}
          subTitle={"사용자가 설정한 값으로 교체 필요"}
        />
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
                onChange={(value) => setTitle(value)}
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
                onChange={(value) => setInformation(value)}
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
                  onChange={(value) => setAuthor(value)}
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
                  // TODO - 입력값 유효성 검증

                  submitPost({
                    title,
                    subtitle: title, // FIXME
                    translator: {
                      // FIXME
                      id: "test",
                      major: "",
                      nickName: "test_nickname",
                    },
                    category: {
                      major: selectedMainCatetory || "",
                      sub: selectedSubCatetory || "",
                    },
                    content: contents.map((content) => ({
                      original: content.original,
                      translated: content.translated,
                    })),
                    style: {
                      fontSize: selectedFontSize,
                      fontFamily: selectedFontFamily,
                    },
                    language: {
                      original: selectedOriginLanguage || "",
                      translated: selectedTranslatedLanguage || "",
                    },
                    description: information,
                    author,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
