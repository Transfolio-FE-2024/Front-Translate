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
  foldCnt: string;
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
  tempStorageAt: boolean;
  fontSize: number; // pt
  fontType: string;
  foldCnt: string;
  tempStorageYn: string;
}
