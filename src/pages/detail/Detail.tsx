import styles from "./Detail.module.scss";
import { GoArrowSwitch } from "react-icons/go";
const Detail = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.pageTitleSection}>
            <div className={styles.pageTitle}>Translator</div>
            <div className={styles.pageSubTitle}>고전시 번역 프리랜서</div>
          </div>
          <div className={styles.thumbnailSection}>
            <div className={styles.thumbnailCardSection}>
              <div className={styles.thumbnailCardIndexSection}>
                <div className={styles.thumbnailCardIndex}></div>
              </div>
              <div className={styles.thumbnailCardContentSection}>
                <div className={styles.thumbnailCardContentOriginalSection}>
                  たら堪らないという気を よく起した。
                </div>
                <div className={styles.thumbnailCardContentTranslationSection}>
                  내가 도룡뇽이라면 견딜 수 없다는 생각을 자주 했다.
                </div>
              </div>
            </div>
            <div className={styles.thumbnailContentSection}>
              <div className={styles.thumbnailContentTitleDateSection}>
                <div className={styles.thumbnailConentTitleSection}>
                  <div className={styles.thumbnailContentTitle}>イモリだ</div>
                  <div className={styles.thumbnailContentPage}>(1P)</div>
                </div>
                <div className={styles.thumbnailContentDateSection}>
                  2022.01.01
                </div>
              </div>
              <div
                className={styles.thumbnailContentTranslationDirectionSection}
              >
                <div className={styles.thumbnailContentTranslationTarget}>
                  일본어
                </div>
                <GoArrowSwitch
                  className={styles.thumbnailContentTranslationArrow}
                />
                <div className={styles.thumbnailContentTranslationTarget}>
                  한국어
                </div>
              </div>
              <div className={styles.thumbnailContentIntroSection}>
                <div className={styles.thumbnailContentIntro}>
                  문학은 시가 나오야의 기노사키에서라는 작품을 번역해보았습니다.
                  저의 첫 문학 번역 작품이며 작가의 의도가 잘 느껴지도록
                  번역하기 위하여 노력했습니다. 일본 특유의 언어성을 옮기기
                  위하여 짧지만 많이 수정했네요. 잘 봐주세요 :)
                </div>
              </div>
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
                  <div className={styles.thumbnailContentDetailTitle}>작가</div>
                  <div className={styles.thumbnailContentDetailContent}>
                    そうた
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.mainContentSection}>
            <div className={styles.mainContent}>
              <div className={styles.mainContentRow}>
                <div className={styles.mainContentRowOriginal}>
                  目分は何気なく傍の流れを見た。
                </div>
                <div className={styles.mainContentRowTranslation}>
                  눈초리는 무심코 곁의 흐름을 보았다.
                </div>
              </div>
              <div className={styles.mainContentRow}>
                <div className={styles.mainContentRowOriginal}>
                  向う側の斜めに水から出ている半畳敷程の石に黒い小さいものがいた。
                </div>
                <div className={styles.mainContentRowTranslation}>
                  맞은편 비스듬히 물에서 나온, 다다미 깔개 정도의 돌에 검은색
                  작은 것이 있었다.
                </div>
              </div>
              <div className={styles.mainContentRow}>
                <div className={styles.mainContentRowOriginal}>
                  イモリだ。未だ濡れていて、それはいい色をしていた。
                </div>
                <div className={styles.mainContentRowTranslation}>
                  머리를 아래로 경사에서 흐름에 임하여 응연했다.
                </div>
              </div>
              <div className={styles.mainContentRow}>
                <div className={styles.mainContentRowOriginal}>
                  頭を下に傾斜から流れへ了臨んで、凝然としていた。
                </div>
                <div className={styles.mainContentRowTranslation}>
                  맞은편 비스듬히 물에서 나온, 다다미 깔개 정도의 돌에 검은색
                  작은 것이 있었다.
                </div>
              </div>
              <div className={styles.mainContentRow}>
                <div className={styles.mainContentRowOriginal}>
                  からからになったまま干からびそうだ
                  ソーダみたく弾けて飛びそうだ
                </div>
                <div className={styles.mainContentRowTranslation}>
                  바싹 바짝 마른 채 메마를 것 같고 소다처럼 터져 날아갈 것 같아
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
