import React from "react";
import styles from "./Portfolio.module.scss";
import ThumbnailCardFolderable from "@/components/thumbnail-card/thumbnail-card-folderable/ThumbnailCardFolderable";
import { useNavigate } from "react-router-dom";

const Portfolio: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.grid}>
      <ThumbnailCardFolderable
        original="たら堪らないという気を よく起した。"
        translated="내가 도룡뇽이라면 견딜 수 없다는 생각을 자주 했다."
        writer="@Kimhim"
        picked={4}
        color="orange"
        onClicked={() => {
          navigate("/home/content");
        }}
      />
      <ThumbnailCardFolderable
        original="あなたと溶け合って 深いところで重なって "
        translated="당신과 어울려 깊은 곳에 겹쳐서"
        writer="@Kimhim"
        picked={4}
        color="orange"
        onClicked={() => {
          navigate("/home/content");
        }}
        preSave
      />
      <div className={styles.thumbnailEmptyContainer}></div>
    </div>
  );
};

export default Portfolio;
