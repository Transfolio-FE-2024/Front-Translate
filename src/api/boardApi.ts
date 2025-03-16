import { Board } from "@/interface/client/board";
import { Board as S_Board } from "@/interface/server/board";
import { Portfolio } from "@/interface/client/profile";
import { Portfolio as S_Portfolio } from "@/interface/server/profile";
import { TF } from "@/util/const";
import transfolioAxios from "./transfolioAxios";

const boardApi = () => {
  /** 게시글 등록 */
  async function createBoard(board: Board) {
    return await transfolioAxios
      .post(
        "/board/regist",
        {
          userId: "프론트에서전달불가",
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

  /** 게시글 수정 */
  async function updateBoard(board: { boardPid: string; boardData: Board }) {
    return await transfolioAxios
      .put(
        `/board/edit/${board.boardPid}`,
        {
          userId: "프론트에서전달불가",
          boardTitle: board.boardData.boardTitle,
          boardSubTitle: board.boardData.boardSubTitle,
          beforeLang: board.boardData.beforeLang,
          afterLang: board.boardData.afterLang,
          boardDescription: board.boardData.boardDescription,
          highCtg: board.boardData.highCtg,
          lowCtg: board.boardData.lowCtg,
          boardAuthor: board.boardData.boardAuthor,
          boardContent: board.boardData.boardContent,
          tempStorageYn: board.boardData.tempStorageYN,
          fontSize: board.boardData.fontSize,
          fontType: board.boardData.fontType,
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

  /** 게시글 삭제 */
  async function deleteBoard(boardPid: string) {
    return await transfolioAxios
      .delete(`/board/delete/${boardPid}`)
      .then((response) => {
        // FIXME - 응답형식 확인 필요
        return null;
      });
  }

  /** 게시글 단건 조회 */
  async function getBoardById(
    boardId: string
  ): Promise<{ portfolio: Portfolio; isAuthorYN: "Y" | "N" }> {
    return await transfolioAxios.get(`/board/${boardId}`).then((response) => {
      const board = response.data as {
        boardDto: S_Portfolio;
        isAuthorYn: boolean;
      };

      return {
        portfolio: {
          boardPid: board.boardDto.boardPid,
          userId: board.boardDto.userId,
          boardTitle: board.boardDto.boardTitle,
          afterLang: board.boardDto.afterLang,
          beforeLang: board.boardDto.beforeLang,
          boardSubTitle: board.boardDto.boardSubTitle,
          boardDescription: board.boardDto.boardDescription,
          highCtg: board.boardDto.highCtg,
          lowCtg: board.boardDto.lowCtg,
          boardAuthor: board.boardDto.boardAuthor,
          boardContent: board.boardDto.boardContent,
          fontSize: board.boardDto.fontSize,
          fontType: board.boardDto.fontType,
          foldCnt: board.boardDto.foldCnt,
          tempStorageYN: board.boardDto.tempStorageYn === "Y" ? "Y" : "N",
        },
        isAuthorYN: board.isAuthorYn ? "Y" : "N",
      };
    });
  }

  /** 홈화면 - 오늘의 번역 */
  async function getTodaysTranslator(): Promise<Portfolio[]> {
    return await transfolioAxios.get("/todaysTranslator").then((response) =>
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

  /** 찜하기(접기) */
  async function bookmark(boardID: number) {
    return await transfolioAxios
      .post(
        "/board/bookmark",
        {
          boardPid: String(boardID),
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

  /** 게시글 저장 완료 화면 - top3 번역가 */
  async function getTop3Translators(
    highCtg: string,
    lowCtg: string
  ): Promise<{ userId: string; email: string }[]> {
    return transfolioAxios
      .post(
        "/board/top3-translators",
        {
          highCtg,
          lowCtg,
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then((response) => {
        console.log(response);
        return [];
      });
  }

  return {
    createBoard,
    updateBoard,
    deleteBoard,
    getBoardById,
    getTodaysTranslator,
    bookmark,
    getTop3Translators,
  };
};

export default boardApi();
