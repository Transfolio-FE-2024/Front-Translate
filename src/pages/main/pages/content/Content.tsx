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
import boardApi from "@/api/boardApi";
import { useQuery } from "@tanstack/react-query";
import DefaultLoading from "@/components/loading/default-loading/DefaultLoading";

const Content = () => {
  const { contentId = "" } = useParams();
  const {
    data: board,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["page.content", "board", contentId],
    queryFn: () => boardApi.getBoardById(contentId),
  });

  if (error) throw new Error("오류발생!!");

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* FIXME - 사용자 한 줄 소개 API 필요 (GET, POST/PUT) */}
        <PageTitle mainTitle={"Translator"} subTitle={"기능 미구현"} />
        <div className={styles.thumbnailSection}>
          <div className={styles.thumbnailCardSection}>
            <ThumbnailCardUnfolderable
              content={board?.portfolio.boardTitle || ""}
              color={getCategoryColor(board?.portfolio.highCtg || "")}
              fontStyle={board?.portfolio.fontType}
            />
          </div>
          <div className={styles.thumbnailInfoSection}>
            <div className={styles.titleDateSection}>
              <div className={styles.titleSection}>
                {board?.portfolio.boardSubTitle}
              </div>
              <div className={styles.dateSection}>
                {/* FIXME - /board/{boardPid} API 수정 필요 - 포트폴리오의 최종 수정일 */}
                {"기능 미구현"}
              </div>
            </div>
            <div className={styles.languageSection}>
              <div className={styles.language}>
                {board?.portfolio.beforeLang}
              </div>
              <VscArrowSwap className={styles.arrowIcon} />
              <div className={styles.language}>
                {board?.portfolio.afterLang}
              </div>
            </div>
            <div className={styles.descriptionSection}>
              {board?.portfolio.boardDescription}
            </div>
            <div className={styles.etcWrapper}>
              <div
                className={styles.etcItemContainer}
                style={{ marginRight: "48px" }}
              >
                <div className={styles.etcItemTitle}>대분류</div>
                <div className={styles.etcItemContent}>
                  {board?.portfolio.highCtg}
                </div>
              </div>
              <div className={styles.etcItemContainer}>
                <div className={styles.etcItemTitle}>소분류</div>
                <div className={styles.etcItemContent}>
                  {board?.portfolio.lowCtg}
                </div>
              </div>
              <div className={styles.etcItemContainer}>
                <div className={styles.etcItemTitle}>작가</div>
                <div className={styles.etcItemContent}>
                  {board?.portfolio.boardAuthor}
                </div>
              </div>
              <div className={styles.editButtonWrapper}>
                {board && board.portfolio.boardPid && (
                  <Link
                    to={`/home/edit/${board?.portfolio.boardPid || ""}`}
                    className={styles.editButtonContainer}
                  >
                    <div className={styles.editButton}>수정하기</div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {board && (
          <div
            className={className(
              styles.mainContentSection,
              board.portfolio.tempStorageYN === "Y" ? styles.temp : ""
            )}
          >
            <div className={styles.mainContent}>
              {board.portfolio.boardContent
                .split("$") // 컨텐츠 예시: "Hello/안녕하세요$My name is Hong Gil-dong/저는 홍길동입니다",
                .map((contentBlock) => contentBlock.split("/"))
                .map((content, index) => (
                  <div
                    className={styles.mainContentRow}
                    key={index}
                    style={{
                      fontFamily: getFontFamilyByDisplayName(
                        board.portfolio.fontType
                      ),
                      fontSize: `${board.portfolio.fontSize || "12"}pt`,
                    }}
                  >
                    <div
                      className={className(
                        styles.mainContentRowOriginal,
                        // CHECK & FIXME - 임시 저장글인 경우 초록색
                        // 번역된 글이 비어있을 경우 초록색
                        content[1] === "" ||
                          board.portfolio.tempStorageYN === "Y"
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
                ))}
            </div>
          </div>
        )}
      </div>
      {isLoading && <DefaultLoading />}
    </div>
  );
};

export default Content;
