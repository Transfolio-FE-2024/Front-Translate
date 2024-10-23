import {
  UserInfo as S_UserInfo,
  Portfolio as S_Portfolio,
} from "@/interface/server/profile";
import { UserInfo, Portfolio } from "@/interface/client/profile";
import axios from "axios";

const profileApi = () => {
  /** 프로필 - 사용자 프로필 정보 조회 */
  async function getMyInfo(userId: string): Promise<UserInfo> {
    return await axios
      .post(
        `${String(import.meta.env.VITE_API_HOST)}/profile/myInfo`,
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
          foldCnt: userInfo.foldCnt,
          userIntrs: {
            intrsLanguage: userInfo.userIntrs.intrsLanguage,
            intrsMajor: userInfo.userIntrs.intrsMajor,
            intrsLiterature: userInfo.userIntrs.intrsLiterature,
            intrsCorporation: userInfo.userIntrs.intrsCorporation,
          },
        };
      });
  }

  /** 프로필 - 포트폴리오 조회 */
  async function getPortfolio(userId: string): Promise<Portfolio[]> {
    return await axios
      .post(
        `${String(import.meta.env.VITE_API_HOST)}/profile/portfolio`,
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

        return [...portfolios];
      });
  }

  return {
    getMyInfo,
    getPortfolio,
  };
};

export default profileApi();
