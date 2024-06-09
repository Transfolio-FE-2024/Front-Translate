import styles from "./ContentSlider.module.scss";
import "./ContentSlider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ThumbnailCardFolderable from "@/components/thumbnail-card/thumbnail-card-folderable/ThumbnailCardFolderable";
import { useRef, useState } from "react";
import Arrow from "../arrow/Arrow";
import { useMediaQuery } from "react-responsive";
import ThumbnailTitle from "@/components/thumbnail-title/ThumbnailTitle";

const sliderContents = [1, 2, 3, 4, 5, 6, 7, 8];
const ContentSlider = () => {
  const isMobile = useMediaQuery({ maxWidth: "767px" });
  const sliderNumber = isMobile ? 1 : 3;
  const [pageIndex, setPageIndex] = useState<number>(0);
  const slickRef = useRef<Slider>(null);
  const sliderSettings = {
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
    <>
      <div className={styles.container}>
        <div className={styles.titleSection}>Today's freelance translator</div>
        <div className={styles.bodySection}>
          <Slider {...sliderSettings} ref={slickRef}>
            {sliderContents.map((slider) => {
              return (
                <>
                  <div className={styles.thumbnailContainer} key={slider}>
                    <ThumbnailTitle interest="언어" />
                    <div className={styles.thumbnailSection}>
                      <ThumbnailCardFolderable
                        original="たら堪らないという気をよく起した。 "
                        translated="내가 도룡뇽이라면 견딜 수 없다는 생각을 자주 했다. "
                        major="고전시가 번역 전문"
                        writer="@Kimhim"
                        picked={109}
                        color="orange"
                        onClicked={() => {}}
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default ContentSlider;
