import React, { useEffect, useState } from "react";
import styles from "./Career.module.scss";
import { Career as ICareer } from "@/interface/client/profile";
import profileApi from "@/api/profileApi";
import { useParams } from "react-router-dom";
import JwtManager from "@/util/jwtManager";
import { TF } from "@/util/const";
import { className, CookieManager, formatDate } from "@/util";
import { FaCheck } from "react-icons/fa";

const Career: React.FC = () => {
  const { writerId = "" } = useParams();
  const [careerList, setCareerList] = useState<ICareer[]>();
  const [modItemIdx, setModItemIdx] = useState<number>();

  useEffect(() => {
    profileApi
      .getMyCareer(writerId)
      .then((items) => {
        // FIXME - 경력 데이터 정상화 시 삭제
        if (!items.length) {
          setCareerList(
            JSON.parse(
              JSON.stringify([
                {
                  careerTitle: "일본 아이돌 서바이벌 프로그램 번역",
                  careerContent:
                    "경력이나 프로젝트 관련 경험을 간략히 작성해주세요. 경력이나 프로젝트 관련 경험을 간략히 작성해주세요. 경력이나 프로젝트 관련 경험을 간략히 작성해주세요. 경력이나 프로젝트 관련 경험을 간략히 작성해주세요. 경력이나 프로젝트 관련 경험을 간략히 작성해주세요. 경력이나 프로젝트 관련 경험을 간략히 작성해주세요.",
                  careerDate: "2022-01-01",
                  updatedAt: null,
                  createdAt: "2024-11-11T18:44:37.833407",
                  userId: "accountTest",
                },
                {
                  careerTitle: "고전시 번역 ~.~",
                  careerContent:
                    "번역번역번역번역번역번역번역번역번역번역번역번역",
                  careerDate: "2021-05-10",
                  updatedAt: "2021-05-11",
                  createdAt: "2024-11-11T18:44:37.83343",
                  userId: "accountTest",
                },
              ])
            )
          );
          return;
        }
        //

        setCareerList(items);
      })
      .catch((e) => {
        console.warn("[Transfolio] ", e);
        alert("프로필 정보를 가져오는 도중 오류가 발생했습니다.");
      });
  }, []);

  const handleClickRegist = () => {
    alert("등록 미구현");
  };

  const handleClickModify = (idx: number) => {
    setModItemIdx(idx);
  };

  const handleClickSave = (idx: number) => {
    alert("저장 미구현: " + idx);
    setModItemIdx(undefined);
  };

  const handleClickDelete = () => {
    alert("삭제 미구현");
  };

  // 토큰 확인
  const jwtPayload = JwtManager.decodeJwt(
    CookieManager.get(document, TF.KEY.COOKIE.TOKEN) || ""
  );

  // 본인 확인 - 본인 페이지인 경우
  if (
    !!jwtPayload &&
    !!writerId &&
    !!jwtPayload[TF.KEY.JWT.LOGIN_ID] &&
    writerId === jwtPayload[TF.KEY.JWT.LOGIN_ID]
  )
    return (
      <div className={styles.container}>
        {careerList && careerList.length > 0 && (
          <>
            {/* design */}
            <div className={styles.centerLine}>
              <div className={styles.bottomNot}></div>
            </div>
            {/* content */}
            <div className={styles.cardContainer}>
              {/* 경력 작성 컴포넌트 */}
              <div className={className(styles.cardWrapper, styles.add)}>
                <div className={styles.card}>
                  <div className={styles.top}>
                    <div className={styles.date}>
                      {formatDate(new Date(), "YYYY.MM.DD")}
                    </div>
                    <input
                      type="text"
                      className={styles.mainText}
                      placeholder="경력 제목을 작성해주세요."
                      maxLength={30}
                    ></input>
                    <div className={styles.buttons}>
                      <button
                        className={styles.add}
                        title="등록"
                        onClick={handleClickRegist}
                      ></button>
                    </div>
                  </div>
                  <div className={styles.hr}></div>
                  <div className={styles.bottom}>
                    <textarea
                      className={styles.content}
                      placeholder="경력이나 프로젝트 관련 경험을 간략히 작성해주세요. (180자 이내)"
                    ></textarea>
                  </div>
                </div>
                <div className={styles.trophy}></div>
              </div>
              {/* 경력 목록 */}
              {careerList.map((career, idx) => (
                <div className={styles.cardWrapper}>
                  <div className={styles.card}>
                    <div className={styles.top}>
                      <div className={styles.date}>{career.careerDate}</div>
                      {modItemIdx === idx ? (
                        <input
                          type="text"
                          className={styles.mainText}
                          placeholder="경력 제목을 작성해주세요."
                          maxLength={30}
                        ></input>
                      ) : (
                        <div className={styles.mainText}>
                          {career.careerTitle}
                        </div>
                      )}
                      <div className={styles.buttons}>
                        {modItemIdx === idx ? (
                          <button
                            className={styles.save}
                            title="저장"
                            onClick={() => handleClickSave(idx)}
                          >
                            <FaCheck />
                          </button>
                        ) : (
                          <button
                            className={styles.mod}
                            title="수정"
                            onClick={() => handleClickModify(idx)}
                          ></button>
                        )}
                        <button
                          className={styles.del}
                          title="삭제"
                          onClick={handleClickDelete}
                        ></button>
                      </div>
                    </div>
                    <div className={styles.hr}></div>
                    <div className={styles.bottom}>
                      {modItemIdx === idx ? (
                        <textarea
                          className={styles.content}
                          placeholder="경력이나 프로젝트 관련 경험을 간략히 작성해주세요. (180자 이내)"
                        ></textarea>
                      ) : (
                        <div className={styles.content}>
                          {career.careerContent}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );

  return (
    <div className={styles.container}>
      {careerList && !!careerList.length && (
        <>
          {/* design */}
          <div className={styles.centerLine}>
            <div className={styles.bottomNot}></div>
          </div>
          {/* content */}
          <div className={styles.cardContainer}>
            {/* 경력 목록 */}
            {careerList.map((career) => (
              <div className={styles.cardWrapper}>
                <div className={styles.card}>
                  <div className={styles.top}>
                    <div className={styles.date}>{career.careerDate}</div>
                    <div className={styles.mainText}>{career.careerTitle}</div>
                  </div>
                  <div className={styles.hr}></div>
                  <div className={styles.bottom}>
                    <div className={styles.content}>{career.careerContent}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Career;
