/**
 * 프론트 Interface
 */

export interface Board {
  boardTitle: string;
  boardSubTitle: string;
  beforeLang: string;
  afterLang: string;
  boardDescription: string;
  highCtg: string;
  lowCtg: string;
  boardAuthor: string;
  boardContent: string;
  fontSize: number;
  fontType: string;
  tempStorageYN: "Y" | "N";
}
