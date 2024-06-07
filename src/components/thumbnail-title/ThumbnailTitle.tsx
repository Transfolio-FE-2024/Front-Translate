import styles from "./ThumbnailTitle.module.scss"

const language = [<div className={styles.textWrapper}>번역도 <span className={styles.orange}>감-성</span>적으로</div>, <div className={styles.textWrapper}><span className={styles.orange}>다양한 번역</span>을 경험해보세요</div>, <div className={styles.textWrapper}><span className={styles.orange}>이런 </span>번역은 어떤가요?</div>]
const major = [<div className={styles.textWrapper}>전공생의 <span className={styles.green}>완벽한 </span>번역</div>, <div className={styles.textWrapper}><span className={styles.green}>전공 지식</span>을 바탕으로 번역했어요</div>, <div className={styles.textWrapper}><span className={styles.green}>깊이</span>가 있는 번역이에요</div>]
const literature = [<div className={styles.textWrapper}>원문 번역을 <span className={styles.orange}>새롭게 </span>느껴보세요</div>, <div className={styles.textWrapper}>문학을 더 쉽게 이해하는 법</div>, <div className={styles.textWrapper}>문학을 <span className={styles.orange}>있는 그대로 느끼는 법</span></div>]
const coperation = [<div className={styles.textWrapper}>기업에서 <span className={styles.green}>선호하는</span> 번역체에요</div>, <div className={styles.textWrapper}><span className={styles.green}>비즈니스 번역</span>을 경험해보세요</div>, <div className={styles.textWrapper}>아주 <span className={styles.green}>깔끔한 번역</span></div>]

const list = {
    "언어" : language,
    "전공" : major,
    "문학" : literature,
    "기업" : coperation
}

interface IThumbnailTitle {
    interest : "언어" | "전공" | "문학" | "기업"
};

function ThumbnailTitle({interest} : IThumbnailTitle) {
    const randomNum = Math.floor(Math.random() * list[interest].length);

    return list[interest][randomNum]
}

export default ThumbnailTitle;