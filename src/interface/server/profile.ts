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
  intrsCorporation: string;
  intrsLiterature: string;
  intrsMajor: string;
  intrsLanguage: string;
  totalFoldCnt: number;
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
  tempStorageYn: string;
}
