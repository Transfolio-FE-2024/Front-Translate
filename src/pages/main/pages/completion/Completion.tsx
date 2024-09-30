import styles from "./Completion.module.scss";
import trophyImage from "@/assets/images/trophy.png";
import RankingCard from "./component/rankingCard/RankingCard";
import { useNavigate } from "react-router-dom";

const nickName = "Kimhin";

const Completion = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.topWrapper}>
          <div className={styles.completion}>Completion</div>
          <div className={styles.completionCaption}>
            {nickName}님! 다른 작품에도 도전해보세요
          </div>
        </div>
        <div className={styles.middleWrapper}>
          <div className={styles.trophyImageWrapper}>
            <img className={styles.trophyImage} src={trophyImage} />
          </div>
          <div className={styles.submitCompletion}>
            <div>{nickName}님의</div>
            <p>&lt;Instant love&gt; 번역이 제출 완료 되었어요!</p>
          </div>
        </div>
        <div>
          <div className={styles.top3Wrapper}>
            <div className={styles.top3Title}>TOP 3</div>
            <div className={styles.top3SubTitle}>
              다른 번역가들을 구경해보세요!
            </div>
          </div>
          <div className={styles.RankingCardWrapper}>
            <RankingCard
              rank={1}
              isEmphasized
              onClicked={() => {
                navigate("/home/writer/kimhim00");
              }}
            />
            <RankingCard
              rank={2}
              onClicked={() => {
                navigate("/home/writer/kimhim00");
              }}
            />
            <RankingCard
              rank={3}
              onClicked={() => {
                navigate("/home/writer/kimhim00");
              }}
            />
          </div>
          <div>
            <button
              onClick={() => {
                navigate("/home");
              }}
              className={styles.backButton}
            >
              돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Completion;
