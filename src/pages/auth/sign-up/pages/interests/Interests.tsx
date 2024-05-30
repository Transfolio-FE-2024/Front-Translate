import MainButtonRound from "@/components/button/main-button-round/MainButtonRound";
import { useState } from "react";
import styles from "./Interests.module.scss";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import { SessionStorageManager } from "@/util";
import { TF } from "@/util/const";
import { SignUpInfo } from "@/interface";
import { signUp } from "@/api/auth";

const tableTitles = ["언어", "전공", "문학", "기업"];
const langContents = [
  "한국어",
  "영어",
  "일본어",
  "중국어",
  "러시아어",
  "불어",
  "기타",
];
const majorContents = [
  "공학",
  "교육",
  "사회",
  "예체능",
  "의약",
  "인문",
  "자연",
];
const literatureContents = [
  "고전 시",
  "고전 소설",
  "서정 시",
  "중국 문학",
  "일본 문학",
  "유럽 문학",
  "기타",
];
const enterContents = [
  "엔터테인먼트",
  "공기업",
  "사기업",
  "스타트업",
  "서류",
  "계약서",
  "기타",
];
const contents = [
  langContents,
  majorContents,
  literatureContents,
  enterContents,
];
type Item = {
  key: string;
  value: string;
};

const Interests = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<Item[]>([]);

  const tableBoxClickHandler = (item: Item) => {
    const value = selectedItem.find(
      (_item) => _item.key === item.key && _item.value === item.value
    );

    if (value === undefined) {
      setSelectedItem((prev) => [...prev, item]);
    } else {
      const ret = selectedItem.filter(
        (_item) => _item.key !== item.key || _item.value !== item.value
      );

      setSelectedItem(ret);
    }
  };

  return (
    <>
      <Layout>
        <div className={styles.container}>
          <div></div>
          <div className={styles.content}>
            <div className={styles.pageTitleSection}>
              <div className={styles.pageTitle}>
                TRANSFOLIO
                <br />
                KEYWORD
              </div>
              <div>
                <div className={styles.pageSubTitle}>관심분야를 접어주세요</div>
              </div>
            </div>
            <div className={styles.tableSection}>
              <div className={styles.table}>
                <div className={styles.tableTitles}>
                  {tableTitles.map((title, index) => {
                    return (
                      <>
                        <div className={styles.tableTitle} key={index}>
                          {title}
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className={styles.tableContents}>
                  {contents.map((content, index) => {
                    return (
                      <>
                        <div className={styles.tableRow} key={index}>
                          {content.map((contentTitle, contentIndex) => {
                            return (
                              <>
                                <div
                                  className={`${styles.contentBox} ${
                                    contentIndex !== content.length - 1
                                      ? styles.contentRightBorder
                                      : null
                                  } ${
                                    index !== contents.length - 1
                                      ? styles.contentBottomBorder
                                      : null
                                  }
                                
                                `}
                                  key={contentIndex}
                                >
                                  {contentTitle}
                                  <div
                                    className={styles.contentButton}
                                    onClick={() => {
                                      tableBoxClickHandler({
                                        key: tableTitles[index],
                                        value: contentTitle,
                                      });
                                    }}
                                  >
                                    {selectedItem.find(
                                      (_item) =>
                                        _item.key === tableTitles[index] &&
                                        _item.value === contentTitle
                                    ) !== undefined && (
                                      <div
                                        className={`${styles.contentChecked} ${styles.contentCheckedMark}`}
                                      ></div>
                                    )}
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={styles.mainButton}>
              <MainButtonRound
                title="다음"
                onClicked={async () => {
                  if (selectedItem.length > 0) {
                    const signUpInfo: SignUpInfo = JSON.parse(
                      SessionStorageManager.get(
                        window,
                        TF.KEY.SESSION_STORAGE.SIGNUPINFO
                      ) as string
                    );

                    // 세션 스토리지에 저장된 정보(= 이전 단계 정보)가 없거나 비정상인 경우
                    if (!signUpInfo) {
                      alert("오류가 발생하여 이전 단계로 돌아갑니다.");
                      navigate("/signup/regform");
                      return;
                    }

                    const intrsLanguage: string[] = [];
                    const intrsMajor: string[] = [];
                    const intrsLiterature: string[] = [];
                    const intrsCorporation: string[] = [];
                    selectedItem.forEach((item: Item) => {
                      switch (item.key) {
                        case "언어":
                          intrsLanguage.push(item.value);
                          break;
                        case "전공":
                          intrsMajor.push(item.value);
                          break;
                        case "문학":
                          intrsLiterature.push(item.value);
                          break;
                        case "기업":
                          intrsCorporation.push(item.value);
                          break;
                      }
                    });
                    signUpInfo.userIntrsDto = {
                      intrsLanguage: intrsLanguage.join(","),
                      intrsMajor: intrsMajor.join(","),
                      intrsLiterature: intrsLiterature.join(","),
                      intrsCorporation: intrsCorporation.join(","),
                    };

                    signUp(signUpInfo)
                      .then((res) => {
                        console.log(res);
                        SessionStorageManager.remove(
                          window,
                          TF.KEY.SESSION_STORAGE.SIGNUPINFO
                        );
                        navigate("/signup/complete");
                      })
                      .catch((e) => {
                        console.error("[TF_ERROR]", e);
                        alert("오류가 발생했습니다.");
                      });
                  }
                }}
                enable={selectedItem.length > 0}
              />
            </div>
          </div>
          <div></div>
        </div>
      </Layout>
    </>
  );
};

export default Interests;
