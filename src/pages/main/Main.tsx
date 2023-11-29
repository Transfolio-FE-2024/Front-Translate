import styles from "./Main.module.scss";
import ContentSlider from "./component/contentSlider/ContentSlider";
import HeaderSlider from "./component/headerSlider/HeaderSlider";
import ThumbnailCardFolderable from "@/components/thumbnail-card/thumbnail-card-folderable/ThumbnailCardFolderable";
import Writers from "./component/writers/Writers";

let thumbnailContents = [1, 2, 3, 4, 5, 6, 7, 8];
const Main = () => {
  return (
    <>
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
              Today's freelance translator
            </div>
            <div className={styles.thumbnailCardSection}>
              {thumbnailContents.map((thumbnail) => {
                return (
                  <>
                    <div className={styles.thumbnailContainer}>
                      <div className={styles.thumbnailTitle}>
                        <span>번역도</span>&ensp;
                        <span className={styles.textHighlight}>감-성</span>
                        &ensp;
                        <span>으로</span>
                      </div>
                      <div className={styles.thumbnailSection}>
                        <ThumbnailCardFolderable
                          original="たら堪らないという気をよく起した。 내가 도룡뇽이라면 견딜 수 없다는 생각을 자주 했다."
                          translated="번역본"
                          writer="@Kimhim"
                          picked={109}
                        />
                      </div>
                    </div>
                  </>
                );
              })}
              <div className={styles.thumbnailEmptyContainer}></div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.moveToPageContainer}>
              <div>
                <div className={styles.moveToPageSubTitle}>
                  translation contest
                </div>
                <div className={styles.moveToPageTitle}>
                  프리랜서 번역가라면?
                </div>
              </div>
              <div
                className={`${styles.moveToPageTitle} ${styles.fontPretend}`}
              >
                내가 만든 포트폴리오 보러가기
              </div>
            </div>
            <div className={styles.divider}></div>
            <Writers />
            <div className={styles.divider}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
