import { APIResponse, SignUpInfo } from "@/interface";
import { TF } from "@/util/const";
import axios from "axios";

export const signIn = async (userId: string, password: string) => {
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
