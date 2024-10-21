import styles from "./HeaderSlider.module.scss";
import Slider, { Settings } from "react-slick";
import mainImg1 from "../../../../assets/images/main_1.png";
import mainImg2 from "../../../../assets/images/main_2.png";
import mainImg3 from "../../../../assets/images/main_3.png";
import { className } from "@/util";

const HeaderSlider = () => {
  const sliderSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 10000,
    accessibility: false, // focus 제거
    className: styles.slider,
    dotsClass: className("slick-dots", styles.dots),
  };

  return (
    <div className={styles.container}>
      <Slider {...sliderSettings}>
        <div className={styles.customSliderContent}>
          <img src={mainImg1} className={styles.customSliderImg} />
        </div>
        <div className={styles.customSliderContent}>
          <img src={mainImg2} className={styles.customSliderImg} />
        </div>
        <div className={styles.customSliderContent}>
          <img src={mainImg3} className={styles.customSliderImg} />
        </div>
      </Slider>
    </div>
  );
};

export default HeaderSlider;
