import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Content.module.scss";
import { GoArrowSwitch } from "react-icons/go";
import PageTitle from "../../../../components/page-title/PageTitle";
import ThumbnailCardUnfolderable from "../../../../components/thumbnail-card/thumbnail-card-unfolderable/ThumbnailCardUnfolderable";
import { posts } from "@/util/sample-data";
import { TF } from "@/util/const";
import { getCategoryColor } from "@/util";

const preSave = true;

const Content = () => {
  const { contentId = "" } = useParams();
  const navigate = useNavigate();
  const editButtonOnClick = useCallback(() => {
    navigate("/home/edit");
  }, []);

  const post = posts.find((post) => post.id === contentId);

  // FIXME
  if (!post) {
    const err = new Error();
    err.name = TF.PAGE_ERROR.NOT_FOUND;
    throw err;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <PageTitle mainTitle={"Translator"} subTitle={post.translator.major} />
        <div className={styles.thumbnailSection}>
          <ThumbnailCardUnfolderable
            original={post.title.original}
            translated={post.title.translated}
            color={getCategoryColor(post.category.major)}
            fontStyle={post.style.fontFamily}
          />
          <div className={styles.thumbnailContentSection}>
            <div className={styles.thumbnailContentTitleDateSection}>
              <div className={styles.thumbnailConentTitleSection}>
                <div className={styles.thumbnailContentTitle}>
                  {post.title.original}
                </div>
                <div className={styles.thumbnailContentPage}>(1P)</div>
              </div>
              <div className={styles.thumbnailContentDateSection}>
                {post.lastUpdatedDate}
              </div>
            </div>
            <div className={styles.thumbnailContentTranslationDirectionSection}>
              <div className={styles.thumbnailContentTranslationTarget}>
                {post.language.original}
              </div>
              <GoArrowSwitch
                className={styles.thumbnailContentTranslationArrow}
              />
              <div className={styles.thumbnailContentTranslationTarget}>
                {post.language.translated}
              </div>
            </div>
            <div className={styles.thumbnailContentIntroSection}>
              <div className={styles.thumbnailContentIntro}>
                {post.description}
              </div>
            </div>
            <div className={styles.thumbnailContentDetailWrapper}>
              <div className={styles.thumbnailContentDetailWrap}>
                <div className={styles.thumbnailContentDetailSection}>
                  <div className={styles.thumbnailContentDetail}>
                    <div className={styles.thumbnailContentDetailTitle}>
                      카테고리
                    </div>
                    <div className={styles.thumbnailContentDetailContent}>
                      언어
                    </div>
                  </div>
                </div>
                <div className={styles.thumbnailContentDetailSection}>
                  <div className={styles.thumbnailContentDetail}>
                    <div className={styles.thumbnailContentDetailTitle}>
                      작가
                    </div>
                    <div className={styles.thumbnailContentDetailContent}>
                      {post.author}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.editButton} onClick={editButtonOnClick}>
                수정하기
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainContentSection}>
          <div className={styles.mainContent}>
            {post.content.map((content, index) => (
              <div
                className={styles.mainContentRow}
                key={index}
                style={{ fontFamily: post.style.fontFamily }}
              >
                <div
                  className={`${styles.mainContentRowOriginal}${
                    content.translated === "" || preSave
                      ? ` ${styles.greenColor}`
                      : ` ${styles.orangeColor}`
                  }`}
                >
                  {content.original}
                </div>
                <div className={styles.mainContentRowTranslation}>
                  {content.translated}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
