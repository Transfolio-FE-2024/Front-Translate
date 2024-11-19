import React, { useRef, useState } from "react";
import styles from "./Career.module.scss";
import profileApi from "@/api/profileApi";
import { useParams } from "react-router-dom";
import JwtManager from "@/util/jwtManager";
import { TF } from "@/util/const";
import { className, CookieManager, formatDate, ValidationUtil } from "@/util";
import { FaCheck } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import careerApi from "@/api/careerApi";
import { Career as ICareer } from "@/interface/client/profile";

const Career: React.FC = () => {
  const { writerId = "" } = useParams();
  const newCareerDateInputRef = useRef<HTMLInputElement>(null);
  const [newCareerObj, setNewCareerObj] = useState<ICareer>({
    careerDate: formatDate(new Date(), "YYYYMMDD"),
    careerTitle: "",
    careerContent: "",
  });
  const [modifyingCareerObj, setModifyingCareerObj] = useState<
    { idx: number; career: ICareer } | undefined
  >();
  const [focusOnNewCareerDate, setFocusOnNewCareerDate] = useState<boolean>();
  const queryClient = useQueryClient();
  const { data: careerList } = useQuery({
    queryKey: ["page.writer", "career", writerId],
    queryFn: () => profileApi.getMyCareer(writerId),
  });
  const { mutate: addCareer } = useMutation({
    mutationFn: careerApi.createCareer,
    onSuccess: (res) => {
      alert("등록되었습니다.");

      // 입력란 초기화
      setNewCareerObj({
        careerDate: formatDate(new Date(), "YYYYMMDD"),
        careerTitle: "",
        careerContent: "",
      });

      // 데이터 리로드
      queryClient.invalidateQueries({
        queryKey: ["page.writer", "career", writerId],
      });
    },
    onError: (e: Error) => alert(e.message),
  });

  const handleClickRegist = () => {
    // Validation Check #1 - 필수 입력값 체크
    {
      const onError = (key: string) => alert(`${key}(을)를 입력하세요.`);

      if (
        !ValidationUtil.isWhiteSpace(
          { value: newCareerObj.careerDate || "", key: "날짜", onError },
          { value: newCareerObj.careerTitle || "", key: "제목", onError }
        )
      ) {
        return;
      }
    }

    // Validation Check #2 - 날짜는 숫자로만 입력가능
    {
      if (!/^\d*$/.test(newCareerObj.careerDate)) {
        alert("날짜 형식이 잘못되었습니다.");
        return;
      }
    }

    addCareer(newCareerObj);
  };

  const handleChangeNewCareerDate = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCareerObj((prev) => ({
      ...prev,
      careerDate: e.target.value,
    }));
  };

  const handleChangeNewCareerTitle = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCareerObj((prev) => ({
      ...prev,
      careerTitle: e.target.value,
    }));
  };

  const handleChangeNewCareerContent = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewCareerObj((prev) => ({
      ...prev,
      careerContent: e.target.value,
    }));
  };

  const handleClickModify = (idx: number, career: ICareer) => {
    setModifyingCareerObj({ idx, career });
  };

  const handleClickSave = (idx: number) => {
    alert("저장 미구현: " + idx);
    setModifyingCareerObj(undefined);
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
                    <div className={styles.dateWrapper}>
                      {focusOnNewCareerDate ? (
                        <input
                          ref={newCareerDateInputRef}
                          type="text"
                          className={styles.date}
                          placeholder={"YYYYMMDD"}
                          maxLength={8}
                          onChange={handleChangeNewCareerDate}
                          value={newCareerObj.careerDate}
                          onBlur={() => setFocusOnNewCareerDate(false)}
                        ></input>
                      ) : (
                        <div
                          className={styles.date}
                          onClick={() => {
                            setFocusOnNewCareerDate(true);
                            setTimeout(
                              () => newCareerDateInputRef.current?.select(),
                              100
                            );
                          }}
                        >
                          {newCareerObj.careerDate.length > 0
                            ? newCareerObj.careerDate.replace(
                                // "2024.11.19"와 같은 형식으로 표현
                                /(\d{1,2})(\d{2})?(\d{2})?$/,
                                (_, g1, g2, g3) => {
                                  return [g1, g2, g3].filter(Boolean).join(".");
                                }
                              )
                            : formatDate(new Date(), "YYYY.MM.DD")}
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      className={styles.mainText}
                      placeholder="경력 제목을 작성해주세요."
                      maxLength={30}
                      onChange={handleChangeNewCareerTitle}
                      value={newCareerObj.careerTitle}
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
                      onChange={handleChangeNewCareerContent}
                      value={newCareerObj.careerContent}
                    ></textarea>
                  </div>
                </div>
                <div className={styles.trophy}></div>
              </div>
              {/* 경력 목록 */}
              {careerList.map((career, idx) => (
                <div className={styles.cardWrapper} key={idx}>
                  <div className={styles.card}>
                    <div className={styles.top}>
                      <div className={styles.dateWrapper}>
                        {/* FIXME 2024.11.19 */}
                        {false && (
                          <input
                            type="text"
                            className={styles.date}
                            placeholder={"YYYYMMDD"}
                            maxLength={8}
                          ></input>
                        )}
                        {/* FIXME 2024.11.19 */}
                        <div className={styles.date}>{career.careerDate}</div>
                      </div>
                      {modifyingCareerObj?.idx === idx ? (
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
                        {modifyingCareerObj?.idx === idx ? (
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
                            onClick={() => handleClickModify(idx, career)}
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
                      {modifyingCareerObj?.idx === idx ? (
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
