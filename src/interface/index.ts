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
