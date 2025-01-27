import styles from "./Completion.module.scss";
import trophyImage from "@/assets/images/trophy.png";
import RankingCard from "./component/rankingCard/RankingCard";
import { useNavigate, useParams } from "react-router-dom";
import { className } from "@/util";
import { useContext, useEffect, useState } from "react";
import boardApi from "@/api/boardApi";
import { AuthContext } from "@/context/AuthContext";

const Completion = (): JSX.Element => {
  const { contentId = "" } = useParams();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [title, setTitle] = useState<string>("");

  const loginId = authContext.userId;

  useEffect(() => {
    if (!contentId) {
      alert("잘못된 접근입니다.");
      return;
    }

    boardApi
      .getBoardById(contentId)
      .then((board) => setTitle(board.portfolio.boardTitle))
      .catch((e) => {
        console.warn("[Transfolio] ", e);
        alert("데이터를 가져오는 도중 오류가 발생했습니다.");
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.topWrapper}>
          <div className={styles.completion}>Completion</div>
          <div className={styles.completionCaption}>
            {loginId}님! 다른 작품에도 도전해보세요
          </div>
        </div>
        <div className={styles.middleWrapper}>
          <div className={styles.trophyImageWrapper}>
            <img className={styles.trophyImage} src={trophyImage} />
          </div>
          <div className={styles.submitCompletion}>
            <div className={className(styles.text, styles.highlight)}>
              {loginId}님의
            </div>
            <div className={styles.text}>
              {title} 번역이 제출 완료 되었어요!
            </div>
          </div>
        </div>
        <div>
          <div className={styles.top3Wrapper}>
            <div className={styles.title}>Award</div>
            <div className={styles.subTitle}>
              {title} 번역가분들의 인기순위에요!
            </div>
          </div>
          <div className={styles.rankingCardWrapper}>
            <RankingCard
              rank={1}
              isEmphasized
              onClicked={() => {
                navigate("/home/writer/accountTest");
              }}
            />
            <RankingCard
              rank={2}
              onClicked={() => {
                navigate("/home/writer/accountTest");
              }}
            />
            <RankingCard
              rank={3}
              onClicked={() => {
                navigate("/home/writer/accountTest");
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
