import MainButtonRound from "@/components/button/main-button-round/MainButtonRound";
import { useState } from "react";
import styles from "./Interests.module.scss";

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
      <div className={styles.container}>
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
              title="트랜스폴리오 시작하기"
              onClicked={() => {}}
              enable={selectedItem.length > 0}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Interests;
