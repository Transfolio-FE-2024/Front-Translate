import { useNavigate } from "react-router-dom";
import ContentSlider from "../../component/contentSlider/ContentSlider";
import HeaderSlider from "../../component/headerSlider/HeaderSlider";
import Writers from "../../component/writers/Writers";
import styles from "./Home.module.scss";
import ThumbnailCardFolderable from "@/components/thumbnail-card/thumbnail-card-folderable/ThumbnailCardFolderable";
import ThumbnailTitle from "@/components/thumbnail-title/ThumbnailTitle";
import { posts } from "@/util/sample-data";
import { getCategoryColor } from "@/util";

const nickName = "Kimhim";
const currentUserId = "Kimhim";
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <HeaderSlider />
      </div>
      <div className={styles.content}>
        <div className={styles.divider}></div>
        <div className={styles.bodySection}>
          <ContentSlider />
          <div className={styles.divider}></div>
          <div className={styles.titleSection}>
            {nickName}님의 관심분야의 번역들이에요!
          </div>
          <div className={styles.thumbnailCardSection}>
            {posts.map((post) => {
              return (
                <div className={styles.thumbnailContainer} key={post.id}>
                  <ThumbnailTitle interest="전공" />
                  <div className={styles.thumbnailSection}>
                    <ThumbnailCardFolderable
                      original={post.title.original}
                      translated={post.title.translated}
                      major={post.translator.major}
                      writer={`@${post.translator.nickName}`}
                      picked={109}
                      color={getCategoryColor(post.category.major)}
                      href={`/home/content/${post.id}`}
                      fontStyle={post.style.fontFamily}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.divider}></div>
          <div
            className={styles.moveToPageContainer}
            onClick={() => navigate(`/home/writer/${currentUserId}`)}
          >
            <div>
              <div className={styles.moveToPageSubTitle}>
                translation contest
              </div>
              <div className={styles.moveToPageTitle}>프리랜서 번역가라면?</div>
            </div>
            <div className={`${styles.moveToPageTitle} ${styles.fontPretend}`}>
              내가 만든 포트폴리오 보러가기
            </div>
          </div>
          <div className={styles.divider}></div>
          <Writers />
          <div className={styles.divider}></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
