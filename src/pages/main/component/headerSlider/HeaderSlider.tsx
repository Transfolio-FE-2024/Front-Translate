import styles from "./HeaderSlider.module.scss";
import Slider from "react-slick";

const HeaderSlider = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <div className={styles.container}>
        <Slider {...sliderSettings}>
          <div className={styles.container1}>1</div>
          <div className={styles.container2}>2</div>
          <div className={styles.container3}>3</div>
        </Slider>
      </div>
    </>
  );
};

export default HeaderSlider;
