import { Board } from "@/interface/client/board";
import { Board as S_Board } from "@/interface/server/board";
import { CookieManager } from "@/util";
import { TF } from "@/util/const";
import JwtManager from "@/util/jwtManager";
import axios from "axios";

const boardApi = () => {
  /** 게시글 등록 */
  async function createBoard(board: Board) {
    const loginId = JwtManager.decodeJwt(
      CookieManager.get(document, TF.KEY.COOKIE.TOKEN) || ""
    )?.[TF.KEY.JWT.LOGIN_ID];

    if (!loginId) {
      throw new Error("로그인 정보가 유효하지 않음");
    }

    return await axios
      .post(
        `${String(import.meta.env.VITE_API_HOST)}/board`,
        { ...board, userId: loginId } as S_Board, // FIXME userId 토큰에서 추출
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then((response) => ({
        message: response.data.object.message,
        result: response.data.object.result,
        status:
          response.data.object.status || TF.HTTP_STATUS.FAIL_UNKNOWN_STATUS,
      }));
  }

  /** 홈화면 - 관심분야 게시물 */
  async function getHomeInterests() {
    return await axios
      .get(`${String(import.meta.env.VITE_API_HOST)}/homeIntrs`)
      // .then((response) => ({
      //   message: response.data.message,
      //   result: response.data.result,
      //   status: response.data.status || TF.HTTP_STATUS.FAIL_UNKNOWN_STATUS,
      // }));
      .then((response) => console.log(response)); // FIXME - BE와 인터페이스 맞추기
  }

  return {
    createBoard,
    getHomeInterests,
  };
};

export default boardApi();
