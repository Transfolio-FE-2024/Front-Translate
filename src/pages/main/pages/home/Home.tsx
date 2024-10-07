import { Link } from "react-router-dom";
import ContentSlider from "../../component/contentSlider/ContentSlider";
import HeaderSlider from "../../component/headerSlider/HeaderSlider";
import Writers from "../../component/writers/Writers";
import styles from "./Home.module.scss";
import Section from "./component/section/Section";
import ThumbnailCardGallery from "./component/section/thumbnail-card-gallery/ThumbnailCardGallery";

const nickName = "Kimhim";
const currentUserId = "Kimhim";

const Home = () => {
  return (
    <div className={styles.container}>
      <HeaderSlider />
      <div className={styles.content}>
        <div className={styles.bodySection}>
          <Section
            title={"Today's freelance translator"}
            content={<ContentSlider />}
            style={{ marginBottom: "194px" }}
          />
          <Section
            title={`${nickName}님의 관심분야의 번역들이에요!`}
            content={<ThumbnailCardGallery />}
            style={{ marginBottom: "198px" }}
          />
          <Section
            content={
              <Link to={`/home/writer/${currentUserId}`}>
                <div className={styles.moveToPageContainer}>
                  <div>
                    <div className={styles.moveToPageSubTitle}>
                      translation contest
                    </div>
                    <div className={styles.moveToPageTitle1}>
                      프리랜서 번역가라면?
                    </div>
                  </div>
                  <div className={styles.moveToPageTitle2}>
                    내가 만든 포트폴리오 보러가기
                  </div>
                </div>
              </Link>
            }
            style={{ marginBottom: "157px" }}
          />
          <Section
            title={
              <div className={styles.writerTitleSection}>
                <div className={styles.main}>Translator</div>
                <div className={styles.sub}>트랜스폴리오가 추천하는 번역가</div>
              </div>
            }
            content={<Writers />}
            style={{ marginBottom: "73px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
