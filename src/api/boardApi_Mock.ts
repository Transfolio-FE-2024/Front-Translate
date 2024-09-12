/**
 * 파일명: boardApi_Mock.ts
 * 생성일: 2024.09.12
 * 설  명: BackEnd의 REST API가 준비되지 않았더라도 FrontEnd에서는 유사한 환경으로 테스트 하기 위해 이 파일을 생성하였음
 */
import { Post } from "@/interface";

const boardApiMock = () => {
  /** 게시글 등록 */
  async function createBoard(post: Post) {
    const fontSize = parseInt(
      (post.style.fontSize.match(/^\d+/) || ["12"])[0], // 기본 fontSize: 12
      10
    );

    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            message: "API Mock",
            result: {},
            status: 500,
          }),
        500 // Network delay mock: 500ms
      );
    });

    // return await axios
    //   .post(
    //     `${String(import.meta.env.VITE_API_HOST)}/board`,
    //     {
    //       userId: "test",
    //       boardTitle: post.title,
    //       boardSubTitle: "subtitle",
    //       beforeLang: post.language.original,
    //       afterLang: post.language.translated,
    //       boardDescription: post.description,
    //       highCtg: post.category.major,
    //       lowCtg: post.category.sub,
    //       boardAuthor: post.author,
    //       boardContent: JSON.stringify(post.content),
    //       tempStorageAt: false,
    //       fontSize,
    //       fontType: post.style.fontFamily,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json;charset=UTF-8",
    //       },
    //     }
    //   )
    //   .then((response) => ({
    //     message: response.data.message,
    //     result: response.data.result,
    //     status: response.data.status || TF.HTTP_STATUS.FAIL_UNKNOWN_STATUS,
    //   }));
  }

  return {
    createBoard,
  };
};

export default boardApiMock();
