import { useCallback, useEffect, useRef, useState } from "react";
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
import {
  className,
  CookieManager,
  getCategoryColor,
  getFontFamilyByDisplayName,
  ValidationUtil,
} from "@/util";
import ThumbnailCardUnfolderable from "@/components/thumbnail-card/thumbnail-card-unfolderable/ThumbnailCardUnfolderable";
import DropdownButton from "../portfolio/component/dropdown-button/DropdownButton";
import WritingContent from "../portfolio/component/writing-content/WritingContent";
import { Portfolio } from "@/interface/client/profile";
import boardApi from "@/api/boardApi";
import { useMutation } from "@tanstack/react-query";
import { Board } from "@/interface/client/board";
import JwtManager from "@/util/jwtManager";

const Edit = () => {
  const { contentId = "" } = useParams();
  const navigate = useNavigate();
  const indexRef = useRef<number>(1);
  const [board, setBoard] = useState<Portfolio>();
  const [thumbnail, setThumbnail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [information, setInformation] = useState<string>("");
  const [selectedOriginLanguage, setSelectedOriginLanguage] = useState<
    undefined | string
  >();
  const [selectedTranslatedLanguage, setSelectedTranslatedLanguage] = useState<
    undefined | string
  >();
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
  const [contents, setContents] = useState<ContentType[]>([]);
  //
  const { mutate: submitPost } = useMutation({
    mutationFn: (board: Board) => boardApi.createBoard(board),
    onSuccess: (data) => {
      navigate(`/home/completion/${data.result.boardPid}`);
    },
    onError: (e: Error) => alert(e.message),
  });

  useEffect(() => {
    if (!contentId) {
      alert("잘못된 접근입니다.");
      return;
    }

    boardApi
      .getBoardById(contentId)
      .then((board) => setBoard(board))
      .catch((e) => {
        console.warn("[Transfolio] ", e);
        alert("데이터를 가져오는 도중 오류가 발생했습니다.");
      });
  }, []);

  useEffect(() => {
    if (!board) return;

    setThumbnail(board.boardTitle);
    setTitle(board.boardSubTitle);
    setInformation(board.boardDescription);
    setSelectedOriginLanguage(board.beforeLang);
    setSelectedTranslatedLanguage(board.afterLang);
    setSelectedMainCategory(board.highCtg as MainCategoryType);
    setSelectedSubCategory(board.lowCtg);
    setAuthor(board.boardAuthor);
    setSelectedFontSize(`${board.fontSize}pt`);
    setSelectedFontFamily(getFontFamilyByDisplayName(board.fontType));
    setContents(
      board.boardContent.length === 0
        ? [
            {
              id: indexRef.current++,
              focused: true,
              original: "",
              translated: "",
            } as ContentType,
          ]
        : board.boardContent
            .split("$") // 컨텐츠 예시: "Hello/안녕하세요$My name is Hong Gil-dong/저는 홍길동입니다",
            .map((contentBlock) => contentBlock.split("/"))
            .map(
              (content, index) =>
                ({
                  id: index,
                  focused: index === 0,
                  original: content[0],
                  translated: content[1],
                } as ContentType)
            )
    );
  }, [board]);

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

  const handleClickPreSave = () => saveBoard(true);

  const handleClickSubmit = () => saveBoard();

  function saveBoard(preSave: boolean = false) {
    // Validation Check #1 - 필수 입력값 체크
    {
      const onError = (key: string) => alert(`${key}(을)를 입력하세요.`);

      if (
        !ValidationUtil.isBlank(
          { value: thumbnail, key: "썸네일", onError },
          { value: title, key: "제목", onError },
          { value: selectedOriginLanguage || "", key: "원문 언어", onError },
          {
            value: selectedTranslatedLanguage || "",
            key: "번역 언어",
            onError,
          },
          {
            value: selectedMainCatetory?.toString() || "",
            key: "대분류",
            onError,
          },
          {
            value: selectedSubCatetory?.toString() || "",
            key: "소분류",
            onError,
          }
        )
      ) {
        return;
      }
    }

    // Validation Check #2 - 원문 언어와 번역 언어가 같은 경우 등록 불가
    {
      if (selectedOriginLanguage === selectedTranslatedLanguage) {
        alert("같은 언어는 선택할 수 없습니다.");
        return;
      }
    }

    const token = JwtManager.decodeJwt(
      CookieManager.get(document, TF.KEY.COOKIE.TOKEN) || ""
    );
    const loginId = token ? token[TF.KEY.JWT.LOGIN_ID] : "";

    if (loginId) {
      submitPost({
        boardTitle: thumbnail,
        boardSubTitle: title,
        beforeLang: selectedOriginLanguage || "",
        afterLang: selectedTranslatedLanguage || "",
        boardDescription: information,
        highCtg: selectedMainCatetory ? selectedMainCatetory.toString() : "",
        lowCtg: selectedSubCatetory ? selectedSubCatetory.toString() : "",
        boardAuthor: author,
        boardContent: contents
          .map((content) => [content.original, content.translated].join("/"))
          .join("$"),
        fontSize: Number(selectedFontSize.replace("pt", "") || "12"),
        fontType: preDefinedFontFamily[selectedFontFamily],
        tempStorageYN: preSave ? "Y" : "N",
      });
    } else {
      alert("로그인 정보가 바르지 않습니다.");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* FIXME - 사용자 한 줄 소개 API 필요 (GET, POST/PUT) */}
        <PageTitle mainTitle={"Translator"} subTitle={"기능 미구현"} />
        <div className={styles.thumbnailSection}>
          <div className={styles.thumbnailCardSection}>
            <ThumbnailCardUnfolderable
              content={thumbnail}
              color={getCategoryColor(selectedMainCatetory || "")}
              fontStyle={selectedFontFamily}
              isEditMode
              onChangeContent={setThumbnail}
            />
          </div>
          <div className={styles.thumbnailInfoSection}>
            <div className={styles.titleTextFieldSection}>
              <TextField
                value={title}
                onChange={changeTitle}
                placeholder="제목을 입력해주세요"
              />
              <div className={styles.titleDateSection}>
                {/* FIXME - /board/{boardPid} API 수정 필요 - 포트폴리오의 최종 수정일 */}
                {"기능 미구현"}
              </div>
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

export default Edit;
