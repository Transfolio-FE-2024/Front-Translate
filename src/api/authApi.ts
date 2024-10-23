/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIResponse, SignUpInfo } from "@/interface";
import { TF } from "@/util/const";
import axios from "axios";

const authApi = () => {
  /** 로그인 */
  async function signIn(userId: string, password: string) {
    return await axios
      .post(
        `${String(import.meta.env.VITE_API_HOST)}/user/sign-in`,
        {
          userId,
          password,
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
  }

  /** 회원가입 */
  async function signUp(signUpInfo: SignUpInfo): Promise<APIResponse> {
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
  }

  /** SNS로그인(카카오) */
  async function kakaoLogin(kakaoToken: any) {
    return await axios.post("https://localhost:4000/api/login/kakao", {
      ...kakaoToken.data,
    });
  }

  return {
    signIn,
    signUp,
    kakaoLogin,
  };
};

export default authApi();
