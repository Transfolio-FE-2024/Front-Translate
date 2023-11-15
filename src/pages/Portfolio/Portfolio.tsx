import styles from './Portfolio.module.scss';

function Portfolio() {
  return (
    <div className={styles.container}>
      <div className={styles.titleBanner}>
        <h1 className={styles.title}>Translator</h1>
        <h2 className={styles.subTitle}>고전시 번역 프리랜서</h2>
      </div>

      <div className={styles.portfolioContainer}>
        <div className={styles.penmanshipContainer}>
          <div className={styles.colorBadge}></div>
          <div className={styles.penmanshipSelector}></div>
          <textarea
            className={styles.penmanshipTextarea}
            name='penmanship-create'
            id='penmanship-create'
            cols={10}
            rows={30}
            placeholder='제목 작성하기'
          ></textarea>
          <div className={styles.penmanshipFooter}>
            <span className={styles.username}>@Kimhim00</span>
            <span className={styles.userNumber}>00</span>
          </div>
        </div>

        <div className={styles.portfolioInfoContainer}>
          <div className={styles.portfolioTitleContainer}>
            <input className={styles.portfolioTitle} />
            <span className={styles.createdAt}>2022.01.20</span>
          </div>

          <div className={styles.languageSelectContainer}>
            <div className={styles.originalLanguageSelector}></div>
            {/* 번역할 언어 선택 아이콘  */}
            <div className={styles.translatedLanguageSelector}></div>
          </div>

          <div className={styles.descriptionContainer}>
            <textarea
              className={styles.descriptionTextarea}
              name='description-textarea'
              id='description-textarea'
              cols={30}
              rows={10}
              placeholder='작품 설명 (200자 )'
            ></textarea>
          </div>

          <div className={styles.categoryContainer}></div>
        </div>
      </div>

      <div className={styles.translateContainer}>
        <div className={styles.fontSizeSelector}>글자 크기</div>
        <div className={styles.penmanshipSelector}>서체 설정</div>

        <div className={styles.translateArea}>
          <div className={styles.translateBox}>
            <p className={styles.beforeTranslate}></p>
            <textarea className={styles.afterTranslate} />
          </div>
        </div>
      </div>

      <div className={styles.actionButtonGroup}>
        <button className={styles.saveButton}>임시저장</button>
        <button className={styles.submitButton}>제출하기</button>
      </div>
    </div>
  );
}

export default Portfolio;
