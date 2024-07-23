import styles from "./ContentSlider.module.scss";
import "./ContentSlider.css";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ThumbnailCardFolderable from "@/components/thumbnail-card/thumbnail-card-folderable/ThumbnailCardFolderable";
import { useRef, useState } from "react";
import Arrow from "../arrow/Arrow";
import { useMediaQuery } from "react-responsive";
import ThumbnailTitle from "@/components/thumbnail-title/ThumbnailTitle";
import { posts } from "@/util/sample-data";
import { getCategoryColor } from "@/util";

const ContentSlider = () => {
  const isMobile = useMediaQuery({ maxWidth: "767px" });
  const sliderNumber = isMobile ? 1 : 3;
  const [pageIndex, setPageIndex] = useState<number>(0);
  const slickRef = useRef<Slider>(null);
  const sliderSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: sliderNumber,
    slidesToScroll: sliderNumber,
    nextArrow: <Arrow left={false} onClicked={() => next()} />,
    prevArrow: <Arrow onClicked={() => previous()} />,
    afterChange: (index: number) => {
      setPageIndex(index);
    },
    customPaging: (index: number) => {
      return (
        <div
          className={`${styles.customDot} ${
            index === pageIndex / sliderNumber ? styles.active : styles.inActive
          }`}
        ></div>
      );
    },
  };

  const previous = () => {
    slickRef.current!.slickPrev();
  };

  const next = () => {
    slickRef.current!.slickNext();
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>Today's freelance translator</div>
      <div className={styles.bodySection}>
        <Slider {...sliderSettings} ref={slickRef}>
          {posts.map((post) => {
            return (
              <div className={styles.thumbnailContainer} key={post.id}>
                <ThumbnailTitle interest={post.category.major} />
                <div className={styles.thumbnailSection}>
                  <ThumbnailCardFolderable
                    original={post.title.original}
                    translated={post.title.translated}
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
        </Slider>
      </div>
    </div>
  );
};

export default ContentSlider;
