import { Post } from "@/interface";
import { TF } from "@/util/const";
import axios from "axios";

const boardApi = () => {
  /** 게시글 등록 */
  async function createBoard(post: Post) {
    const fontSize = parseInt(
      (post.style.fontSize.match(/^\d+/) || ["12"])[0], // 기본 fontSize: 12
      10
    );

    return await axios
      .post(
        `${String(import.meta.env.VITE_API_HOST)}/board`,
        {
          userId: "test",
          boardTitle: post.title,
          boardSubTitle: "subtitle",
          beforeLang: post.language.original,
          afterLang: post.language.translated,
          boardDescription: post.description,
          highCtg: post.category.major,
          lowCtg: post.category.sub,
          boardAuthor: post.author,
          boardContent: JSON.stringify(post.content),
          tempStorageAt: false,
          fontSize,
          fontType: post.style.fontFamily,
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

  return {
    createBoard,
  };
};

export default boardApi();
