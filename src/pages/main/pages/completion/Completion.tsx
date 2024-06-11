import styles from "./Completion.module.scss";
import trophyImage from "@/assets/images/trophy.png";
import RankingCard from "./component/rankingCard/RankingCard";
import { useNavigate } from "react-router-dom";

const nickName = "Kimhin";

const Complete = (): JSX.Element => {
	const navigate = useNavigate();
	return (
		<>
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.topWrapper}>
						<div className={styles.completion}>Completion</div>
						<div className={styles.completionCaption}>
							{nickName}님! 다른 작품에도 도전해보세요
						</div>
					</div>
					<div className={styles.middleWrapper}>
						<div className={styles.trophyImage}>
							<img src={trophyImage} />
						</div>
						<div className={styles.submitCompletion}>
							<div>{nickName}님의</div>
							<p>
								&lt;Instant love&gt; 번역이 제출 완료 되었어요!
							</p>
						</div>
					</div>
					<div>
						<div className={styles.awardWrapper}>
							<div className={styles.awardTitle}>Award</div>
							<div className={styles.awardSubTitle}>
								&lt;Instant love&gt; 번역다분들의 인기순위에요!
							</div>
						</div>
						<div className={styles.RankingCardWrapper}>
							<RankingCard
								rank={1}
								isEmphasized
								onClicked={() => {
									navigate("/home/writer")
								}}
							/>
							<RankingCard rank={2} onClicked={() => {navigate("/home/writer/transfolioTeam")}} />
							<RankingCard rank={3} onClicked={() => {navigate("/home/writer/transfolioTeam")}} />
						</div>
						<div>
							<button
								onClick={() => {navigate("/home")}}
								className={styles.backButton}
							>
								돌아가기
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Complete;
