import styles from "./Writer.module.scss";
import PageTitle from "../../../../components/page-title/PageTitle";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Career, Portfolio } from "./component";
import jwtManager from "@/util/jwtManager";
import { HiOutlinePencil } from "react-icons/hi";
import { CiSettings } from "react-icons/ci";

const tabs = [
  {
    buttonTitle: "포트폴리오",
    component: (
      <div className={styles.topSpace}>
        <Portfolio></Portfolio>
      </div>
    ),
  },
  {
    buttonTitle: "경력",
    component: <Career></Career>,
  },
  {
    buttonTitle: "접음",
    component: <div className={styles.topSpace}>준비중입니다.</div>,
  },
];
const Writer = () => {
  const { writerId = "" } = useParams();
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>(0);
  const [editMode, setEditMode] = useState<boolean>(false); // 프로필 편집 모드 토글
  // FIXME 쿠키에서 토큰 읽어오는 로직으로 변경 필요
  // const isMe =
  //   jwtManager.decodeJwt(prompt("토큰입력: ") || "")?.["loginId"] === writerId;
  const isMe = true;

  const buttonClickHandler = (index: number) => {
    setSelectedButtonIndex(index);
  };

  const renderTabComponent = () => {
    const tabComponent = tabs.find((_, index) => index === selectedButtonIndex);

    if (!tabComponent) return <div>오류</div>;

    return tabComponent.component;
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <PageTitle mainTitle={"Translator"} subTitle={"고전시 번역 프리랜서"} />
        <div className={styles.profileSection}>
          <div className={styles.profileImgSection}>
            {/* <div className={styles.profileImg}></div> */}
            <IoPersonCircleOutline className={styles.profileImg} />
          </div>
          <div className={styles.profileNameSection}>
            <div className={styles.profileNameSectionTitle}>@{writerId}</div>
            {isMe &&
              (editMode ? (
                <div
                  className={styles.profileEditButton}
                  onClick={() => alert("이름 수정 미구현")}
                  title="이름 수정"
                >
                  <HiOutlinePencil className={styles.icon} />
                </div>
              ) : (
                <div
                  className={styles.profileSettingButton}
                  onClick={() => setEditMode(true)}
                  title="편집모드로 전환"
                >
                  <CiSettings className={styles.icon} />
                </div>
              ))}
          </div>
          <div className={styles.profileInfoSection}>
            <div className={styles.profileInfoBox}>
              <div className={styles.profileInfoBoxTitle}>접기</div>
              <div className={styles.profileInfoBoxContent}>1,801</div>
            </div>
            <div className={styles.profileInfoBox}>
              <div className={styles.profileInfoBoxTitle}>분야</div>
              <div className={styles.interestSection}>
                <div className={styles.profileInfoBoxContent}>
                  고전시 • 문학 • 일본어
                </div>
                {isMe && editMode && (
                  <div
                    className={styles.interestEditButton}
                    onClick={() => alert("관심분야 수정 미구현")}
                    title="관심분야 수정"
                  >
                    <HiOutlinePencil className={styles.icon} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.portfolioSection}>
          <div className={styles.portfolioButtonSection}>
            {tabs.map((tab, index) => {
              return (
                <div
                  className={`${styles.portfolioButtonTitle} ${
                    selectedButtonIndex === index
                      ? styles.buttonActive
                      : styles.buttonInActive
                  }`}
                  onClick={() => buttonClickHandler(index)}
                  key={index}
                >
                  {tab.buttonTitle} 4
                </div>
              );
            })}
          </div>
          <div className={styles.portfolioThumbnailCardSection}>
            {renderTabComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Writer;
