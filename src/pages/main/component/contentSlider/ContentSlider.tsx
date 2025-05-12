import styles from "./ContentSlider.module.scss";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ThumbnailCardFolderable from "@/components/thumbnail-card/thumbnail-card-folderable/ThumbnailCardFolderable";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ThumbnailTitle from "@/components/thumbnail-title/ThumbnailTitle";
import { className, getCategoryColor } from "@/util";
import boardApi from "@/api/boardApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Arrow from "../arrow/Arrow";

const ContentSlider = () => {
  const queryClient = useQueryClient();
  const { data: todayList } = useQuery({
    queryKey: ["comp.ContentSlider", "todayList"],
    queryFn: boardApi.getTodaysTranslator,
  });
  const { mutate: toggleBookmark } = useMutation({
    mutationFn: (boardID: number) => boardApi.bookmark(boardID),
    onSuccess: (res) => {
      if (String(res.status) === "200") {
        // 데이터 리로드
        queryClient.invalidateQueries({
          queryKey: ["comp.ContentSlider", "todayList"],
        });
      } else throw new Error("오류가 발생했습니다." + ` ${res.message}`);
    },
    onError: (e: Error) => alert(e.message),
  });

  const isMobile = useMediaQuery({ maxWidth: "767px" });
  const sliderNumber = isMobile ? 1 : 3;
  const [anchorIndex, setAnchorIndex] = useState<number>(0);
  const slickRef = useRef<Slider>(null);
  const sliderSettings: Settings = {
    dots: false,
    infinite: todayList?.length ?? 0 < sliderNumber ? false : true,
    slidesToShow: sliderNumber,
    slidesToScroll: sliderNumber,
    nextArrow: (
      <Arrow left={false} onClicked={() => slickRef.current!.slickNext()} />
    ),
    prevArrow: <Arrow onClicked={() => slickRef.current!.slickPrev()} />,
    afterChange: (index: number) => {
      setAnchorIndex(index);
    },
    dotsClass: `slick-dots ${styles.customDots}`,
  };

  return (
    <>
      {todayList && (
        <div className={styles.container}>
          <Slider {...sliderSettings} ref={slickRef}>
            {todayList.map((post) => {
              return (
                <div className={styles.thumbnailContainer} key={post.boardPid}>
                  <div className={styles.thumbnailTitleSection}>
                    <ThumbnailTitle interest={post.highCtg} />
                  </div>
                  <div className={styles.thumbnailSection}>
                    <ThumbnailCardFolderable
                      original={post.boardTitle}
                      major={post.highCtg}
                      writer={`@${post.userId}`}
                      picked={Number(post.foldCnt || 0)}
                      color={getCategoryColor(post.highCtg)}
                      href={`/home/content/${post.boardPid}`}
                      fontStyle={post.fontType}
                      onClickBookmark={() => toggleBookmark(post.boardPid)}
                    />
                  </div>
                </div>
              );
            })}
          </Slider>
          <div
            className={className(
              styles.transfolioSliderBar,
              todayList.length > sliderNumber ? styles.show : ""
            )}
          >
            {todayList.map((_, idx) => (
              <div
                key={idx}
                className={className(
                  styles.transfolioSliderKnob,
                  idx >= anchorIndex && idx < anchorIndex + sliderNumber
                    ? styles.active
                    : styles.inActive
                )}
                style={{
                  width: `calc(100% / ${todayList.length})`,
                  transform: `translateX(calc(100% * ${idx}))`,
                }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ContentSlider;
