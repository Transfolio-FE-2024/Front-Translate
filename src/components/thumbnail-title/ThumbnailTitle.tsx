import styles from "./ThumbnailTitle.module.scss";

const language = [
  <>
    번역도 <span className={styles.orange}>감-성</span>적으로
  </>,
  <>
    <span className={styles.orange}>다양한 번역</span>을 경험해보세요
  </>,
  <>
    <span className={styles.orange}>이런 </span>번역은 어떤가요?
  </>,
];
const major = [
  <>
    전공생의 <span className={styles.green}>완벽한 </span>번역
  </>,
  <>
    <span className={styles.green}>전공 지식</span>을 바탕으로 번역했어요
  </>,
  <>
    <span className={styles.green}>깊이</span>가 있는 번역이에요
  </>,
];
const literature = [
  <>
    원문 번역을 <span className={styles.orange}>새롭게 </span>느껴보세요
  </>,
  <>
    문학을 <span className={styles.orange}>더 쉽게</span> 이해하는 법
  </>,
  <>
    문학을 <span className={styles.orange}>있는 그대로 느끼는 법</span>
  </>,
];
const coperation = [
  <>
    기업에서 <span className={styles.green}>선호하는</span> 번역체에요
  </>,
  <>
    <span className={styles.green}>비즈니스 번역</span>을 경험해보세요
  </>,
  <>
    아주 <span className={styles.green}>깔끔한 번역</span>
  </>,
];

const list: {
  [key: string]: JSX.Element[];
} = {
  언어: language,
  전공: major,
  문학: literature,
  기업: coperation,
};

interface IThumbnailTitle {
  interest: string;
}

function ThumbnailTitle({ interest }: IThumbnailTitle) {
  const randomNum = Math.floor(Math.random() * list[interest].length);

  return <div className={styles.textWrapper}>{list[interest][randomNum]}</div>;
}

export default ThumbnailTitle;
