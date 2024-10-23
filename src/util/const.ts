export const TF = {
  KEY: Object.freeze({
    SESSION_STORAGE: Object.freeze({
      SIGNUPINFO: "TF_SIGNUPINFO",
    }),
    COOKIE: Object.freeze({
      TOKEN: "jwtToken",
    }),
    JWT: Object.freeze({
      LOGIN_ID: "loginId",
    }),
  }),
  HTTP_STATUS: Object.freeze({
    FAIL_UNKNOWN_STATUS: "900",
  }),
  PAGE_ERROR: Object.freeze({
    NOT_FOUND: "NotFound",
  }),
};

export const CLIENT_SITE_ADDRESS = import.meta.env.DEV
  ? import.meta.env.VITE_LOCAL_SITE_ADDRESS
  : import.meta.env.VITE_REMOTE_SITE_ADDRESS;
export const supportedTranslateLanguage = [
  "한국어",
  "영어",
  "일본어",
  "불어",
  "아랍어",
];
export const areaOfInterest = {
  언어: ["한국어", "영어", "일본어", "중국어", "러시아어", "불어", "기타"],
  전공: ["공학", "교육", "사회", "예체능", "의약", "인문", "자연"],
  문학: [
    "고전 시",
    "고전 소설",
    "서정 시",
    "중국 문학",
    "일본 문학",
    "유럽 문학",
    "기타",
  ],
  기업: [
    "엔터테인먼트",
    "공기업",
    "사기업",
    "스타트업",
    "서류",
    "계약서",
    "기타",
  ],
};

export const preDefinedFontSize = ["12pt", "14pt", "16pt", "18pt", "20pt"];
// export const preDefinedFontFamily: {
//   [key: string]: string;
// } = {
//   Pretendard: "Pretendard",
//   "Nanum Myeangjo": "NanumMyeongjo",
//   "Noto Sans": "NotoSans",
//   "Nanum Barun Gothic": "NanumBarunGothic",
// };
export const preDefinedFontFamily: {
  [key: string]: string;
} = {
  Pretendard: "Pretendard",
  NanumMyeongjo: "Nanum Myeangjo",
  NotoSans: "Noto Sans",
  NanumBarunGothic: "Nanum Barun Gothic",
};
