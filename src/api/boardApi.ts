import { Board } from "@/interface/client/board";
import { Board as S_Board } from "@/interface/server/board";
import { Portfolio } from "@/interface/client/profile";
import { Portfolio as S_Portfolio } from "@/interface/server/profile";
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
        `${String(import.meta.env.VITE_API_HOST)}/board/regist`,
        {
          userId: loginId,
          boardTitle: board.boardTitle,
          boardSubTitle: board.boardSubTitle,
          beforeLang: board.beforeLang,
          afterLang: board.afterLang,
          boardDescription: board.boardDescription,
          highCtg: board.highCtg,
          lowCtg: board.lowCtg,
          boardAuthor: board.boardAuthor,
          boardContent: board.boardContent,
          tempStorageYn: board.tempStorageYN,
          fontSize: board.fontSize,
          fontType: board.fontType,
        } as S_Board,
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

  /** 게시글 단건 조회 */
  async function getBoardById(boardId: string): Promise<Portfolio> {
    return await axios
      .get(`${String(import.meta.env.VITE_API_HOST)}/board/${boardId}`)
      .then((response) => {
        const board = response.data as S_Portfolio;

        return {
          boardPid: board.boardPid,
          userId: board.userId,
          boardTitle: board.boardTitle,
          afterLang: board.afterLang,
          beforeLang: board.beforeLang,
          boardSubTitle: board.boardSubTitle,
          boardDescription: board.boardDescription,
          highCtg: board.highCtg,
          lowCtg: board.lowCtg,
          boardAuthor: board.boardAuthor,
          boardContent: board.boardContent,
          fontSize: board.fontSize,
          fontType: board.fontType,
          foldCnt: board.foldCnt,
          tempStorageYN: board.tempStorageYn === "Y" ? "Y" : "N",
        };
      });
  }

  /** 홈화면 - 오늘의 번역 */
  async function getTodaysTranslator(): Promise<Portfolio[]> {
    return await axios
      .get(`${String(import.meta.env.VITE_API_HOST)}/todaysTranslator`)
      .then((response) =>
        (response.data as S_Portfolio[]).map((board) => ({
          boardPid: board.boardPid,
          userId: board.userId,
          boardTitle: board.boardTitle,
          afterLang: board.afterLang,
          beforeLang: board.beforeLang,
          boardSubTitle: board.boardSubTitle,
          boardDescription: board.boardDescription,
          highCtg: board.highCtg,
          lowCtg: board.lowCtg,
          boardAuthor: board.boardAuthor,
          boardContent: board.boardContent,
          fontSize: board.fontSize,
          fontType: board.fontType,
          foldCnt: board.foldCnt,
          tempStorageYN: board.tempStorageYn === "Y" ? "Y" : "N",
        }))
      );
  }

  return {
    createBoard,
    getBoardById,
    getTodaysTranslator,
  };
};

export default boardApi();
