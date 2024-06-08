// types

export type ContentType = {
    id: number;
    focused: boolean;
    original: string;
    translated: string;
}

export type MainCategoryType = "언어" | "전공" | "문학" | "기업";
export type fontFamilyType =
	| "Pretendard"
	| "Nanum Myeangjo"
	| "Noto Sans"
	| "Nanum Barun Gothic";