import { posts } from "@/util/sample-data";
import styles from "./ThumbnailCardGallery.module.scss";
import ThumbnailTitle from "@/components/thumbnail-title/ThumbnailTitle";
import ThumbnailCardFolderable from "@/components/thumbnail-card/thumbnail-card-folderable/ThumbnailCardFolderable";
import { getCategoryColor } from "@/util";

const ThumbnailCardGallery: React.FC = () => {
  return (
    <div className={styles.container}>
      {posts.map((post) => {
        return (
          <div className={styles.thumbnailContainer} key={post.id}>
            <div className={styles.thumbnailTitleSection}>
              <ThumbnailTitle interest={post.category.major} />
            </div>
            <div className={styles.thumbnailSection}>
              <ThumbnailCardFolderable
                original={post.title}
                major={post.translator.major}
                writer={`@${post.translator.nickName}`}
                picked={109}
                color={getCategoryColor(post.category.major)}
                href={`/home/content/${post.id}`}
                fontStyle={post.style.fontFamily}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ThumbnailCardGallery;
