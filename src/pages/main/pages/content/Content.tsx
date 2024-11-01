import { Link, useParams } from "react-router-dom";
import styles from "./Content.module.scss";
import PageTitle from "@/components/page-title/PageTitle";
import { VscArrowSwap } from "react-icons/vsc";
import {
  className,
  getCategoryColor,
  getFontFamilyByDisplayName,
} from "@/util";
import ThumbnailCardUnfolderable from "@/components/thumbnail-card/thumbnail-card-unfolderable/ThumbnailCardUnfolderable";
import { useEffect, useState } from "react";
import boardApi from "@/api/boardApi";
import { Portfolio } from "@/interface/client/profile";

const Content = () => {
  const { contentId = "" } = useParams();
  const [board, setBoard] = useState<Portfolio>();

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

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* FIXME - 사용자 한 줄 소개 API 필요 (GET, POST/PUT) */}
        <PageTitle mainTitle={"Translator"} subTitle={"기능 미구현"} />
        <div className={styles.thumbnailSection}>
          <div className={styles.thumbnailCardSection}>
            <ThumbnailCardUnfolderable
              original={board?.boardTitle || ""}
              color={getCategoryColor(board?.highCtg || "")}
              fontStyle={board?.fontType}
            />
          </div>
          <div className={styles.thumbnailInfoSection}>
            <div className={styles.titleDateSection}>
              {/* FIXME - /board/{boardPid} API 수정 필요 - 포트폴리오의 최종 수정일 */}
              {"기능 미구현"}
            </div>
            <div className={styles.languageSection}>
              <div className={styles.language}>{board?.beforeLang}</div>
              <VscArrowSwap className={styles.arrowIcon} />
              <div className={styles.language}>{board?.afterLang}</div>
            </div>
            <div className={styles.descriptionSection}>
              {board?.boardDescription}
            </div>
            <div className={styles.etcWrapper}>
              <div
                className={styles.etcItemContainer}
                style={{ marginRight: "48px" }}
              >
                <div className={styles.etcItemTitle}>대분류</div>
                <div className={styles.etcItemContent}>{board?.highCtg}</div>
              </div>
              <div className={styles.etcItemContainer}>
                <div className={styles.etcItemTitle}>소분류</div>
                <div className={styles.etcItemContent}>{board?.lowCtg}</div>
              </div>
              <div className={styles.etcItemContainer}>
                <div className={styles.etcItemTitle}>작가</div>
                <div className={styles.etcItemContent}>
                  {board?.boardAuthor}
                </div>
              </div>
              <div className={styles.editButtonWrapper}>
                {board && board.boardPid && (
                  <Link
                    to={`/home/edit/${board?.boardPid || ""}`}
                    className={styles.editButtonContainer}
                  >
                    <div className={styles.editButton}>수정하기</div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mainContentSection}>
          <div className={styles.mainContent}>
            {board
              ? board.boardContent
                  .split("$") // 컨텐츠 예시: "Hello/안녕하세요$My name is Hong Gil-dong/저는 홍길동입니다",
                  .map((contentBlock) => contentBlock.split("/"))
                  .map((content, index) => (
                    <div
                      className={styles.mainContentRow}
                      key={index}
                      style={{
                        fontFamily: getFontFamilyByDisplayName(board.fontType),
                        fontSize: `${board.fontSize || "12"}pt`,
                      }}
                    >
                      <div
                        className={className(
                          styles.mainContentRowOriginal,
                          // CHECK & FIXME - 임시 저장글인 경우 초록색
                          // 번역된 글이 비어있을 경우 초록색
                          content[1] === "" || board.tempStorageYN === "Y"
                            ? styles.greenColor
                            : styles.orangeColor
                        )}
                      >
                        {content[0]}
                      </div>
                      <div className={styles.mainContentRowTranslation}>
                        {content[1]}
                      </div>
                    </div>
                  ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
