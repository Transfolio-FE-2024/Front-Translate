import React, { useEffect, useState } from "react";
import styles from "./Portfolio.module.scss";
import ThumbnailCardFolderable from "@/components/thumbnail-card/thumbnail-card-folderable/ThumbnailCardFolderable";
import { useParams } from "react-router-dom";
import { getCategoryColor } from "@/util";
import profileApi from "@/api/profileApi";
import { Portfolio as IPortfolio } from "@/interface/client/profile";

const Portfolio: React.FC = () => {
  const { writerId = "" } = useParams();
  const [portfolios, setPortfolios] = useState<IPortfolio[]>();

  useEffect(() => {
    // 포트폴리오 조회
    profileApi
      .getPortfolio(writerId)
      .then((portfolios) => setPortfolios(portfolios))
      .catch(() => alert("오류가 발생했습니다."));
  }, []);

  return (
    <div className={styles.grid}>
      {portfolios && portfolios.length ? (
        portfolios.map((portfolio, index) => (
          <div key={index} className={styles.gridItem}>
            <ThumbnailCardFolderable
              original={portfolio.boardTitle}
              writer={`@${portfolio.userId}`}
              picked={Number(portfolio.foldCnt)}
              color={getCategoryColor(portfolio.highCtg)}
              href={`/home/content/${portfolio.boardPid}`}
              preSave={portfolio.tempStorageYn === "Y"}
              fontStyle={portfolio.fontType}
            />
          </div>
        ))
      ) : (
        <div>포트폴리오가 존재하지 않습니다.</div>
      )}
    </div>
  );
};

export default Portfolio;
