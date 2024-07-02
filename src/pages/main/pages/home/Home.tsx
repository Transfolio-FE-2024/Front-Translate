import { useNavigate } from "react-router-dom";
import ContentSlider from "../../component/contentSlider/ContentSlider";
import HeaderSlider from "../../component/headerSlider/HeaderSlider";
import Writers from "../../component/writers/Writers";
import styles from "./Home.module.scss";
import ThumbnailCardFolderable from "@/components/thumbnail-card/thumbnail-card-folderable/ThumbnailCardFolderable";
import ThumbnailTitle from "@/components/thumbnail-title/ThumbnailTitle";

const nickName = "Kimhim";
const currentUserId = "Kimhim";
const thumbnailContents = [1, 2, 3, 4, 5, 6, 7, 8];
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
            {thumbnailContents.map((thumbnail) => {
              return (
                <div className={styles.thumbnailContainer} key={thumbnail}>
                  <ThumbnailTitle interest="전공" />
                  <div className={styles.thumbnailSection}>
                    <ThumbnailCardFolderable
                      original="たら堪らないという気をよく起した。"
                      translated="내가 도룡뇽이라면 견딜 수 없다는 생각을 자주 했다."
                      major="고전시가 번역 전문"
                      writer="@Kimhim"
                      picked={109}
                      color="green"
                      onClicked={() => navigate("/home/content")}
                    />
                  </div>
                </div>
              );
            })}
            <div className={styles.thumbnailEmptyContainer}></div>
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
