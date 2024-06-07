import styles from "./HeaderSlider.module.scss";
import Slider from "react-slick";
import mainImg1 from "../../../../assets/images/main_1.png";
import mainImg2 from "../../../../assets/images/main_2.png";
import mainImg3 from "../../../../assets/images/main_3.png";

const HeaderSlider = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 10000,
  };

  return (
    <>
      <div className={styles.container}>
        <Slider {...sliderSettings}>
          <div className={styles.sliderContent}>
            <img src={mainImg1} className={styles.img} />
          </div>
          <div className={styles.sliderContent}>
            <img src={mainImg2} className={styles.img} />
          </div>
          <div className={styles.sliderContent}>
            <img src={mainImg3} className={styles.img} />
          </div>
        </Slider>
      </div>
    </>
  );
};

export default HeaderSlider;
