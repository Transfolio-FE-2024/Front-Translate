import { Link, useParams } from "react-router-dom";
import styles from "./Content.module.scss";
import PageTitle from "@/components/page-title/PageTitle";
import { VscArrowSwap } from "react-icons/vsc";
import { TF } from "@/util/const";
import { className, getCategoryColor } from "@/util";
import ThumbnailCardUnfolderable from "@/components/thumbnail-card/thumbnail-card-unfolderable/ThumbnailCardUnfolderable";
import { posts } from "@/util/sample-data";

const Content = () => {
  const { contentId = "" } = useParams();

  const post = posts.find((post) => post.id === contentId);

  // FIXME
  if (!post) {
    const err = new Error();
    err.name = TF.PAGE_ERROR.NOT_FOUND;
    throw err;
  }

  const preSave = post.status === "tmp";

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <PageTitle mainTitle={"Translator"} subTitle={post.translator.major} />
        <div className={styles.thumbnailSection}>
          <div className={styles.thumbnailCardSection}>
            <ThumbnailCardUnfolderable
              original={post.title}
              color={getCategoryColor(post.category.major)}
              fontStyle={post.style.fontFamily}
            />
          </div>
          <div className={styles.thumbnailInfoSection}>
            <div className={styles.titleDateSection}>
              {post.lastUpdatedDate}
            </div>
            <div className={styles.languageSection}>
              <div className={styles.language}>{post.language.original}</div>
              <VscArrowSwap className={styles.arrowIcon} />
              <div className={styles.language}>{post.language.translated}</div>
            </div>
            <div className={styles.descriptionSection}>{post.description}</div>
            <div className={styles.etcWrapper}>
              <div
                className={styles.etcItemContainer}
                style={{ marginRight: "48px" }}
              >
                <div className={styles.etcItemTitle}>대분류</div>
                <div className={styles.etcItemContent}>
                  {post.category.major}
                </div>
              </div>
              <div className={styles.etcItemContainer}>
                <div className={styles.etcItemTitle}>소분류</div>
                <div className={styles.etcItemContent}>{post.category.sub}</div>
              </div>
              <div className={styles.etcItemContainer}>
                <div className={styles.etcItemTitle}>작가</div>
                <div className={styles.etcItemContent}>{post.author}</div>
              </div>
              <div className={styles.editButtonWrapper}>
                <Link
                  to={`/home/edit/${post.id}`}
                  className={styles.editButtonContainer}
                >
                  <div className={styles.editButton}>수정하기</div>
                </Link>
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
                style={{
                  fontFamily: post.style.fontFamily,
                  fontSize: post.style.fontSize,
                }}
              >
                <div
                  className={className(
                    styles.mainContentRowOriginal,
                    content.translated === "" || preSave
                      ? styles.greenColor
                      : styles.orangeColor
                  )}
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
