import { APIResponse, SignUpInfo } from "@/interface";
import { TF } from "@/util/const";
import axios from "axios";

export const signIn = (userId: string, password: string) => {
  axios
    .post(`${String(import.meta.env.VITE_API_HOST)}/user/sign-in`, {
      userId,
      password,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      // 에러 핸들링
      console.log(error);
    })
    .finally(function () {
      // 항상 실행되는 영역
    });
};

export const signUp = async (signUpInfo: SignUpInfo): Promise<APIResponse> => {
  return await axios
    .post(
      `${String(import.meta.env.VITE_API_HOST)}/user/sign-up`,
      {
        ...signUpInfo,
      },
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    )
    .then((response) => ({
      message: response.data.message,
      result: response.data.result,
      status: response.data.status || TF.HTTP_STATUS.FAIL_UNKNOWN_STATUS,
    }));
};
