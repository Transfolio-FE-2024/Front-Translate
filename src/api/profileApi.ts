import {
  UserInfo as S_UserInfo,
  Portfolio as S_Portfolio,
  Career as S_Career,
} from "@/interface/server/profile";
import { UserInfo, Portfolio, Career } from "@/interface/client/profile";
import transfolioAxios from "./transfolioAxios";

const profileApi = () => {
  /** 프로필 - 사용자 프로필 정보 조회 */
  async function getMyInfo(userId: string): Promise<UserInfo> {
    return await transfolioAxios
      .post(
        "/profile/myInfo",
        {
          userId,
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then((response) => {
        const userInfo = response.data as S_UserInfo;

        return {
          userId: userInfo.userId,
          email: userInfo.email,
          foldCnt: userInfo.totalFoldCnt,
          userIntrs: {
            intrsLanguage: userInfo.intrsLanguage,
            intrsMajor: userInfo.intrsMajor,
            intrsLiterature: userInfo.intrsLiterature,
            intrsCorporation: userInfo.intrsCorporation,
          },
        };
      });
  }

  /** 프로필 - 포트폴리오 조회 */
  async function getPortfolio(userId: string): Promise<Portfolio[]> {
    return await transfolioAxios
      .post(
        "/profile/portfolio",
        {
          userId,
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then((response) => {
        const portfolios = response.data as S_Portfolio[];

        return portfolios.map((portfolio) => ({
          boardPid: portfolio.boardPid,
          userId: portfolio.userId,
          boardTitle: portfolio.boardTitle,
          afterLang: portfolio.afterLang,
          beforeLang: portfolio.beforeLang,
          boardSubTitle: portfolio.boardSubTitle,
          boardDescription: portfolio.boardDescription,
          highCtg: portfolio.highCtg,
          lowCtg: portfolio.lowCtg,
          boardAuthor: portfolio.boardAuthor,
          boardContent: portfolio.boardContent,
          fontSize: portfolio.fontSize,
          fontType: portfolio.fontType,
          foldCnt: portfolio.foldCnt,
          tempStorageYN: portfolio.tempStorageYn === "Y" ? "Y" : "N",
        }));
      });
  }

  /** 프로필 - 경력 조회 */
  async function getMyCareer(userId: string): Promise<Career[]> {
    return await transfolioAxios
      .post(
        "/profile/career",
        {
          userId,
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then((response) => {
        const careers = response.data as S_Career[];

        return careers.map((career) => ({
          careerTitle: career.careerTitle,
          careerContent: career.careerContent,
          careerDate: career.careerDate,
        }));
      });
  }

  return {
    getMyInfo,
    getPortfolio,
    getMyCareer,
  };
};

export default profileApi();
