export const TF = {
	KEY: Object.freeze({
		SESSION_STORAGE: Object.freeze({
			SIGNUPINFO: "TF_SIGNUPINFO",
		}),
		COOKIE: Object.freeze({
			TOKEN: "TF_TOKEN",
		}),
	}),
	HTTP_STATUS: Object.freeze({
		FAIL_UNKNOWN_STATUS: "900",
	}),
};

export const languageList = ["한국어", "영어", "일본어", "아랍어", "불어"];
export const fontSizeList = ["14pt", "16pt", "18pt", "20pt"];
export const fontFamilyList: fontFamilyType[] = [
	"Pretendard",
	"Nanum Myeangjo",
	"Noto Sans",
	"Nanum Barun Gothic",
];

export type fontFamilyType =
	| "Pretendard"
	| "Nanum Myeangjo"
	| "Noto Sans"
	| "Nanum Barun Gothic";

export const fontFamily = {
	Pretendard: "Pretendard",
	"Nanum Myeangjo": "NanumMyeangjo",
	"Noto Sans": "NotoSans",
	"Nanum Barun Gothic": "NanumBarunGothic",
};
