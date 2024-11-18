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

const ContentSlider = () => {
  const isMobile = useMediaQuery({ maxWidth: "767px" });
  const sliderNumber = isMobile ? 1 : 3;
  const [pageIndex, setPageIndex] = useState<number>(0);
  // const [todayList, setTodayList] = useState<Portfolio[]>();
  const slickRef = useRef<Slider>(null);
  const sliderSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: sliderNumber,
    slidesToScroll: sliderNumber,
    arrows: false, // FIXME
    // nextArrow: <Arrow left={false} onClicked={() => slickRef.current!.slickNext()} />,
    // prevArrow: <Arrow onClicked={() => slickRef.current!.slickPrev()} />,
    afterChange: (index: number) => {
      setPageIndex(index);
    },
    customPaging: (index: number) => {
      return (
        <div
          className={className(
            styles.customDot,
            index === pageIndex / sliderNumber ? styles.active : styles.inActive
          )}
        ></div>
      );
    },
    dotsClass: `slick-dots ${styles.customDots}`,
  };

  const queryClient = useQueryClient();
  const { data: todayList } = useQuery({
    queryKey: ["comp.ContentSlider", "todayList"],
    queryFn: boardApi.getTodaysTranslator,
  });
  const { mutate: handleClickBookmark } = useMutation({
    mutationFn: (boardID: number) => boardApi.bookmark(boardID),
    onSuccess: (res) => {
      if (String(res.status) === "200") {
        queryClient.invalidateQueries({
          queryKey: ["comp.ContentSlider", "todayList"],
        }); // 데이터 리로드
      } else throw new Error("오류가 발생했습니다." + ` ${res.message}`);
    },
    onError: (e: Error) => alert(e.message),
  });

  return (
    <div className={styles.container}>
      {todayList ? (
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
                    major={"기능 미구현"}
                    writer={`@${post.userId}`}
                    picked={Number(post.foldCnt || 0)}
                    color={getCategoryColor(post.highCtg)}
                    href={`/home/content/${post.boardPid}`}
                    fontStyle={post.fontType}
                    onClickBookmark={() => handleClickBookmark(post.boardPid)}
                  />
                </div>
              </div>
            );
          })}
        </Slider>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default ContentSlider;
