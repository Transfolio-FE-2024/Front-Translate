import { Career as S_Career } from "@/interface/server/profile";
import { Career } from "@/interface/client/profile";
import transfolioAxios from "./transfolioAxios";

const careerApi = () => {
  /** 경력 - 경력 등록 */
  async function createCareer(
    career: Career
  ): Promise<{ career: Career; careerId: string }> {
    return await transfolioAxios
      .post(
        "/career/regist",
        {
          careerPid: null,
          careerTitle: career.careerTitle,
          careerContent: career.careerContent,
          careerDate: career.careerDate,
          updatedAt: null,
          createdAt: null,
          userId: "프론트에서전달불가",
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
            careerPid: createdCareer.careerPid,
            careerTitle: createdCareer.careerTitle,
            careerContent: createdCareer.careerContent,
            careerDate: createdCareer.careerDate,
          },
          careerId: createdCareer.careerPid,
        };
      });
  }

  /** 경력 - 경력 삭제 */
  async function deleteCareer(careerId: number): Promise<boolean> {
    if (careerId) {
      return await transfolioAxios
        .delete(`/career/delete/${careerId}`, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        })
        .then((response) => {
          if (response.status === 204) {
            return true;
          }

          return false;
        });
    }

    return false;
  }

  return {
    createCareer,
    deleteCareer,
  };
};

export default careerApi();
