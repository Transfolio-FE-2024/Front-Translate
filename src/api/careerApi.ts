import { Career as S_Career } from "@/interface/server/profile";
import { Career } from "@/interface/client/profile";
import axios from "axios";
import JwtManager from "@/util/jwtManager";
import { CookieManager } from "@/util";
import { TF } from "@/util/const";

const careerApi = () => {
  /** 경력 - 경력 등록 */
  async function createCareer(
    career: Career
  ): Promise<{ career: Career; careerId: string }> {
    const loginId = JwtManager.decodeJwt(
      CookieManager.get(document, TF.KEY.COOKIE.TOKEN) || ""
    )?.[TF.KEY.JWT.LOGIN_ID];

    if (!loginId) {
      throw new Error("로그인 정보가 유효하지 않음");
    }

    return await axios
      .post(
        `${String(import.meta.env.VITE_API_HOST)}/career/regist`,
        {
          careerPid: null,
          careerTitle: career.careerTitle,
          careerContent: career.careerContent,
          careerDate: career.careerDate,
          updatedAt: null,
          createdAt: null,
          userId: loginId,
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then((response) => {
        type ResType = { careerPid: string } & S_Career;
        const createdCareer = response.data as ResType;

        return {
          career: {
            careerTitle: createdCareer.careerTitle,
            careerContent: createdCareer.careerContent,
            careerDate: createdCareer.careerDate,
          },
          careerId: createdCareer.careerPid,
        };
      });
  }

  return {
    createCareer,
  };
};

export default careerApi();
