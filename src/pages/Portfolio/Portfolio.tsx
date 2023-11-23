import styles from './Portfolio.module.scss';
import DownArrow from '../../assets/icons/portfolio/ico_down_arrow.svg';
import TranslateIcon from '../../assets/icons/portfolio/translate_icon.svg';
import AddTranslateButton from '../../assets/icons/portfolio/add_translate_button.svg';
import { useState } from 'react';

function Portfolio() {
  const [title, setTitle] = useState('');
  const [isOriginalModalOpen, setIsOriginalModalOpen] = useState(false);
  const [isTranslateModalOpen, setIsTranslateModalOpen] = useState(false);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };

  const closeOriginalModal = () => {
    setIsOriginalModalOpen(false);
  };
  const closeTranslateModal = () => {
    setIsTranslateModalOpen(false);
  };

  const openOriginalModal = () => {
    setIsOriginalModalOpen(true);
    setIsTranslateModalOpen(false);
  };
  const openTranslateModal = () => {
    setIsTranslateModalOpen(true);
    setIsOriginalModalOpen(false);
  };

  return (
    <>
      {isTranslateModalOpen && (
        <div
          className={styles.modalBackground}
          onClick={closeTranslateModal}
        ></div>
      )}
      {isOriginalModalOpen && (
        <div
          className={styles.modalBackground}
          onClick={closeOriginalModal}
        ></div>
      )}
      <div className={styles.container}>
        <div className={styles.titleBanner}>
          <h1 className={styles.title}>Translator</h1>
          <h2 className={styles.subTitle}>고전시 번역 프리랜서</h2>
        </div>

        <div className={styles.portfolioContainer}>
          <div className={styles.penmanshipContainer}>
            <div className={styles.flexbox}>
              <div className={styles.colorBadge}></div>
              <div className={styles.penmanshipSelector}>
                <div className={styles.downArrowIcon}>
                  <img src={DownArrow} alt='select-down-arrow' />
                </div>
                <span>서체설정</span>
              </div>
            </div>
            <textarea
              id='penmanship-create'
              name='penmanship-create'
              className={styles.penmanshipTextarea}
              value={title}
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
              <input
                className={styles.portfolioTitleInput}
                value={title}
                onChange={onChangeTitle}
                placeholder='제목을 입력해주세요'
              />
              <span className={styles.createdAt}>2022.01.20</span>
            </div>

            <div className={styles.languageSelectContainer}>
              <span
                className={styles.languageSelector}
                onClick={openOriginalModal}
              >
                언어 선택
              </span>
              <div className={styles.translateIcon}>
                <img src={TranslateIcon} alt='translate-bidirectional-arrows' />
              </div>
              <span
                className={styles.languageSelector}
                onClick={openTranslateModal}
              >
                언어 선택
              </span>

              <div
                className={`${styles.modalContainer} ${
                  isTranslateModalOpen && styles.translateModal
                } ${isOriginalModalOpen && styles.originalModal}
                }`}
              >
                <ul className={styles.modalList}>
                  <li className={styles.modalListItem}>영어</li>
                  <li className={styles.modalListItem}>일본어</li>
                  <li className={styles.modalListItem}>아랍어</li>
                  <li className={styles.modalListItem}>불어</li>
                </ul>
              </div>
            </div>

            <div className={styles.descriptionContainer}>
              <textarea
                className={styles.descriptionTextarea}
                name='description-textarea'
                id='description-textarea'
                cols={30}
                rows={10}
                placeholder='작품 설명 (200자)'
              ></textarea>
            </div>

            <div className={styles.subInfoContainer}>
              <dl className={styles.categoryDataList}>
                <dt className={styles.categoryDataTitle}>카테고리</dt>
                <dd className={styles.categoryData}>______</dd>
              </dl>
              <dl className={styles.categoryDataList}>
                <dt className={styles.categoryDataTitle}>작가</dt>
                <dd className={styles.categoryData}>______</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className={styles.translateContainer}>
          <div className={styles.selectorContainer}>
            <div className={styles.fontSelector}>글자 크기</div>
            <div className={styles.fontSelector}>서체 설정</div>
          </div>

          <div className={styles.translateArea}>
            <div className={styles.addTranslateButton}>
              <img src={AddTranslateButton} alt='add-translate-button' />
            </div>
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
    </>
  );
}

export default Portfolio;
