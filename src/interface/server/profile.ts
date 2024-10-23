/**
 * 백엔드와 소통을 위한 Interface
 */

export interface UserInterest {
  pid: number;
  intrsLanguage: string;
  intrsMajor: string;
  intrsLiterature: string;
  intrsCorporation: string;
  createdAt: string;
  updatedAt: string;
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
