/* eslint-disable @typescript-eslint/no-explicit-any */
export interface APIResponse {
  result: any;
  message: string;
  status: string;
}

export interface UserIntrs {
  intrsLanguage: string;
  intrsMajor: string;
  intrsLiterature: string;
  intrsCorporation: string;
}

export interface SignUpInfo {
  userId: string;
  password: string;
  email: string;
  userIntrsDto: UserIntrs;
}

// FIXME - 임시. 백엔드와 인터페이스 동기화 필요
export interface Post {
  id?: string;
  translator: {
    id: string;
    nickName: string;
    major: string;
  };
  author: string;
  description: string;
  regDate?: string;
  lastUpdatedDate?: string;
  status?: string;
  category: {
    major: string;
    sub: string;
  };
  title: string;
  subtitle: string;
  language: {
    original: string;
    translated: string;
  };
  style: {
    fontSize: string;
    fontFamily: string;
  };
  content: {
    original: string;
    translated: string;
  }[];
}
