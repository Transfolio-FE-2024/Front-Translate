import styles from "./Writer.module.scss";
import PageTitle from "../../../../components/page-title/PageTitle";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Career, Portfolio } from "./component";
import { HiOutlinePencil } from "react-icons/hi";
import { CiSettings } from "react-icons/ci";
import { className, CookieManager } from "@/util";
import profileApi from "@/api/profileApi";
import { TF } from "@/util/const";
import JwtManager from "@/util/jwtManager";
import { UserInfo } from "@/interface/client/profile";

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
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>(0);
  const [editMode, setEditMode] = useState<boolean>(false); // 프로필 편집 모드 토글
  const [isMe, setIsMe] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>();

  useEffect(() => {
    // 토큰 확인
    const payload = JwtManager.decodeJwt(
      CookieManager.get(document, TF.KEY.COOKIE.TOKEN) || ""
    );

    if (!payload || !writerId || !payload[TF.KEY.JWT.LOGIN_ID]) {
      alert("잘못된 접근입니다.");
      navigate(`/signIn?b_url=${encodeURIComponent(location.pathname)}`);
      return;
    }

    // 본인 확인
    if (writerId === payload[TF.KEY.JWT.LOGIN_ID]) setIsMe(true);

    // 프로필 조회
    profileApi
      .getMyInfo(writerId)
      .then((userInfo) => setUserInfo(userInfo))
      .catch(() => alert("오류가 발생했습니다."));
  }, []);

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
            <img
              className={styles.profileImg}
              src={`https://picsum.photos/seed/${Math.random()}/73/73`}
            />
          </div>
          <div className={styles.profileNameSection}>
            <div className={styles.profileNameSectionTitle}>
              @{userInfo?.userId}
            </div>
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
              <div className={styles.profileInfoBoxContent}>
                {userInfo ? userInfo.foldCnt : "-"}
              </div>
            </div>
            <div className={styles.profileInfoBox}>
              <div className={styles.profileInfoBoxTitle}>분야</div>
              <div className={styles.interestSection}>
                <div className={styles.profileInfoBoxContent}>
                  {userInfo
                    ? [
                        userInfo.userIntrs.intrsLanguage,
                        userInfo.userIntrs.intrsMajor,
                        userInfo.userIntrs.intrsLiterature,
                        userInfo.userIntrs.intrsCorporation,
                      ]
                        .flatMap((intrs) => (intrs ? intrs.split(",") : []))
                        .filter(Boolean) // false, 0, -0, 0n, "", null, undefined, NaN 제거
                        .join(" • ")
                    : "-"}
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
        <div className={styles.tabSection}>
          <div className={styles.tabButtonsSection}>
            {tabs.map((tab, index) => {
              return (
                <div
                  className={className(
                    styles.tabButtonTitle,
                    selectedButtonIndex === index
                      ? styles.buttonActive
                      : styles.buttonInActive
                  )}
                  onClick={() => buttonClickHandler(index)}
                  key={index}
                >
                  {tab.buttonTitle} 4
                </div>
              );
            })}
          </div>
          <div className={styles.tabComponentSection}>
            {renderTabComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Writer;
