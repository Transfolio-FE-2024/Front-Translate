/**
 * 프론트 Interface
 */

export interface UserInterest {
  intrsLanguage: string;
  intrsMajor: string;
  intrsLiterature: string;
  intrsCorporation: string;
}

export interface UserInfo {
  userId: string;
  email: string;
  foldCnt: number;
  userIntrs: UserInterest;
}

export interface Portfolio {
  boardPid: number; // 게시글 아이디
  userId: string;
  boardTitle: string;
  afterLang: string;
  beforeLang: string;
  boardSubTitle: string;
  boardDescription: string;
  highCtg: string;
  lowCtg: string;
  boardAuthor: string;
  boardContent: string;
  fontSize: number; // pt
  fontType: string;
  foldCnt: string;
  tempStorageYN: "Y" | "N";
}
