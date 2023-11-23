import styles from "./WriterDetail.module.scss";
import PageTitle from "../../components/page-title/PageTitle";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useState } from "react";
import ThumbnailCardFolderable from "../../components/thumbnail-card/thumbnail-card-folderable/ThumbnailCardFolderable";

let buttonTitles = ["포트폴리오", "경력", "접음"];
const WriterDetail = () => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>(0);

  const buttonClickHandler = (index: number) => {
    setSelectedButtonIndex(index);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <PageTitle
            mainTitle={"Translator"}
            subTitle={"고전시 번역 프리랜서"}
          />
          <div className={styles.profileSection}>
            <div className={styles.profileImgSection}>
              {/* <div className={styles.profileImg}></div> */}
              <IoPersonCircleOutline className={styles.profileImg} />
            </div>
            <div className={styles.profileNameSection}>@Kimhim</div>
            <div className={styles.profileInfoSection}>
              <div className={styles.profileInfoBox}>
                <div className={styles.profileInfoBoxTitle}>접기</div>
                <div className={styles.profileInfoBoxContent}>1,801</div>
              </div>
              <div className={styles.profileInfoBox}>
                <div className={styles.profileInfoBoxTitle}>분야</div>
                <div className={styles.profileInfoBoxContent}>
                  고전시 • 문학 • 일본어
                </div>
              </div>
            </div>
          </div>
          <div className={styles.portfolioSection}>
            <div className={styles.portfolioButtonSection}>
              {buttonTitles.map((title, index) => {
                return (
                  <div
                    className={`${styles.portfolioButtonTitle} ${
                      selectedButtonIndex === index
                        ? styles.buttonActive
                        : styles.buttonInActive
                    }`}
                    onClick={() => buttonClickHandler(index)}
                  >
                    {title} 4
                  </div>
                );
              })}
            </div>
            <div className={styles.portfolioThumbnailCardSection}>
              <ThumbnailCardFolderable
                original="たら堪らないという気を よく起した。"
                translated="내가 도룡뇽이라면 견딜 수 없다는 생각을 자주 했다."
                writer="@Kimhim"
                picked={4}
              />
              <ThumbnailCardFolderable
                original="たら堪らないという気を よく起した。"
                translated="내가 도룡뇽이라면 견딜 수 없다는 생각을 자주 했다."
                writer="@Kimhim"
                picked={4}
              />
              <ThumbnailCardFolderable
                original="たら堪らないという気を よく起した。"
                translated="내가 도룡뇽이라면 견딜 수 없다는 생각을 자주 했다."
                writer="@Kimhim"
                picked={4}
              />
              <ThumbnailCardFolderable
                original="たら堪らないという気を よく起した。"
                translated="내가 도룡뇽이라면 견딜 수 없다는 생각을 자주 했다."
                writer="@Kimhim"
                picked={4}
              />
              <ThumbnailCardFolderable
                original="たら堪らないという気を よく起した。"
                translated="내가 도룡뇽이라면 견딜 수 없다는 생각을 자주 했다."
                writer="@Kimhim"
                picked={4}
              />
              <div className={styles.thumbnailEmptyContainer}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WriterDetail;
