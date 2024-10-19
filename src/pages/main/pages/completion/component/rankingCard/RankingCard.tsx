import styles from "./RankingCard.module.scss";
import PrizeIcon from "@/assets/images/prize.svg?react";
import WriterThumbnail from "@/pages/main/component/writer-thumbnail/WriterThumbnail";
import { className } from "@/util";

const RankingCard: React.FC<{
  rank: number;
  isEmphasized?: true;
  onClicked: () => void;
}> = ({ rank, isEmphasized, onClicked }) => {
  return (
    <div>
      <div
        className={className(
          styles.rank,
          isEmphasized ? styles.colorOrange : ""
        )}
      >
        {rank}위
      </div>
      <div className={styles.writerThumbnailWrapper}>
        <PrizeIcon
          className={className(
            styles.prizeIcon,
            isEmphasized ? styles.fillColorOrange : ""
          )}
        />
        <WriterThumbnail isFolded={false} onClicked={() => {}} />
      </div>
      <div
        className={className(
          styles.button,
          isEmphasized ? styles.bgColorOrange : ""
        )}
        onClick={onClicked}
      >
        번역 구경하러 가기
      </div>
    </div>
  );
};

export default RankingCard;
