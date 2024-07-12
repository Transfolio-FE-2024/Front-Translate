import React from "react";
import styles from "./Portfolio.module.scss";
import ThumbnailCardFolderable from "@/components/thumbnail-card/thumbnail-card-folderable/ThumbnailCardFolderable";
import { useParams } from "react-router-dom";
import { posts } from "@/util/sample-data";
import { getCategoryColor } from "@/util";

const Portfolio: React.FC = () => {
  const { writerId = "" } = useParams();
  const filteredPosts = posts.filter((post) => post.translator.id === writerId);

  if (!filteredPosts.length) return <div>포트폴리오가 존재하지 않습니다.</div>;

  return (
    <div className={styles.grid}>
      {filteredPosts.map((post, index) => (
        <ThumbnailCardFolderable
          original={post.title.original}
          translated={post.title.translated}
          writer={`@${post.translator.nickName}`}
          picked={4}
          color={getCategoryColor(post.category.major)}
          href={`/home/content/${post.id}`}
          preSave={index === filteredPosts.length - 1} // FIXME
        />
      ))}
      <div className={styles.thumbnailEmptyContainer}></div>
    </div>
  );
};

export default Portfolio;
