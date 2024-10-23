/**
 * 백엔드와 소통을 위한 Interface
 */

export interface Board {
  userId: string;
  boardTitle: string;
  boardSubTitle: string;
  beforeLang: string;
  afterLang: string;
  boardDescription: string;
  highCtg: string;
  lowCtg: string;
  boardAuthor: string;
  boardContent: string;
  tempStorageAt: boolean;
  fontSize: number;
  fontType: string;
}
