import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Portfolio.module.scss";
import PageTitle from "@/components/page-title/PageTitle";
import TextField from "@/components/text-field/TextField";
import TextFieldLonger from "@/components/text-field/text-field-longer/TextFieldLonger";
import DropdownButton from "./component/dropdown-button/DropdownButton";
import WritingContent from "./component/writing-content/WritingContent";
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
import { useMutation } from "@tanstack/react-query";
import boardApi from "@/api/boardApi";
import {
  className,
  CookieManager,
  getCategoryColor,
  ValidationUtil,
} from "@/util";
import ThumbnailCardUnfolderable from "@/components/thumbnail-card/thumbnail-card-unfolderable/ThumbnailCardUnfolderable";
import JwtManager from "@/util/jwtManager";
import { Board } from "@/interface/client/board";

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
    mutationFn: (board: Board) => boardApi.createBoard(board),
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

  const handleClickPreSave = () => saveBoard(true);

  const handleClickSubmit = () => saveBoard();

  function saveBoard(preSave: boolean = false) {
    // 필수 입력값 체크
    const onError = (key: string) => alert(`${key}(을)를 입력하세요.`);

    if (
      !ValidationUtil.isBlank(
        { value: title, key: "제목", onError },
        { value: selectedOriginLanguage || "", key: "원문 언어", onError },
        { value: selectedTranslatedLanguage || "", key: "번역 언어", onError },
        {
          value: selectedMainCatetory?.toString() || "",
          key: "대분류",
          onError,
        },
        { value: selectedSubCatetory?.toString() || "", key: "소분류", onError }
      )
    ) {
      return;
    }

    const token = JwtManager.decodeJwt(
      CookieManager.get(document, TF.KEY.COOKIE.TOKEN) || ""
    );
    const loginId = token ? token[TF.KEY.JWT.LOGIN_ID] : "";

    if (loginId) {
      submitPost({
        boardTitle: title,
        boardSubTitle: title,
        beforeLang: selectedOriginLanguage || "",
        afterLang: selectedTranslatedLanguage || "",
        boardDescription: information,
        highCtg: selectedMainCatetory ? selectedMainCatetory.toString() : "",
        lowCtg: selectedSubCatetory ? selectedSubCatetory.toString() : "",
        boardAuthor: author,
        boardContent: JSON.stringify(contents),
        tempStorageAt: preSave,
        fontSize: Number(selectedFontSize || "12"),
        fontType: preDefinedFontFamily[selectedFontFamily],
      });
    } else {
      alert("오류가 발생했습니다.");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <PageTitle
          mainTitle={"Translator"}
          subTitle={"사용자가 설정한 값으로 교체 필요"}
        />
        <div className={styles.thumbnailSection}>
          <div className={styles.thumbnailCardSection}>
            <ThumbnailCardUnfolderable
              original={title}
              color={getCategoryColor(selectedMainCatetory || "")}
              fontStyle={selectedFontFamily}
              isEditMode
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
                onChange={(value) => setInformation(value)}
                placeholder="작품 설명을 입력해주세요. (200자)"
                maxLength={200}
              />
            </div>
            <div className={styles.etcSection}>
              <div className={styles.etcTitleSection}>대분류</div>
              <div
                className={className(styles.dropdownSection, styles.category)}
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
              <div className={styles.etcTitleSection}>소분류</div>
              <div
                className={className(styles.dropdownSection, styles.category)}
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
            <div className={styles.etcSection}>
              <div className={styles.etcTitleSection}>작가</div>
              <div className={styles.authorInputSection}>
                <TextField
                  value={author}
                  onChange={(value) => setAuthor(value)}
                  placeholder="작가를 입력해주세요"
                />
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
                onClick={handleClickPreSave}
              >
                임시저장
              </button>
            </div>
            <div className={styles.mainButtonSection}>
              <button className={styles.btnSubmit} onClick={handleClickSubmit}>
                제출하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
