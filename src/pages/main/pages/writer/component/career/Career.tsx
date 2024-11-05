import React, { useEffect, useState } from "react";
import styles from "./Career.module.scss";
import { Career as ICareer } from "@/interface/client/profile";
import profileApi from "@/api/profileApi";
import { useParams } from "react-router-dom";

const Career: React.FC = () => {
  const { writerId = "" } = useParams();
  const [careerList, setCareerList] = useState<ICareer[]>();

  useEffect(() => {
    profileApi
      .getMyCareer(writerId)
      .then((items) => setCareerList(items))
      .catch((e) => {
        console.warn("[Transfolio] ", e);
        alert("프로필 정보를 가져오는 도중 오류가 발생했습니다.");
      });
  }, []);

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
            {careerList.map((career) => (
              <div className={styles.cardWrapper}>
                <div className={styles.card}>
                  <div className={styles.date}>{career.careerDate}</div>
                  <div className={styles.mainText}>{career.careerTitle}</div>
                  <div className={styles.rightArea}>
                    <div className={styles.subText}>{career.careerContent}</div>
                    <div className={styles.writer}>작가명 미구현</div>
                  </div>
                  <div className={styles.corner}></div>
                </div>
                <div className={styles.trophy}></div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Career;
