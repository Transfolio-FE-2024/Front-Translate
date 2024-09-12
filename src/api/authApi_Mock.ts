/**
 * 파일명: authApi_Mock.ts
 * 생성일: 2024.09.12
 * 설  명: BackEnd의 REST API가 준비되지 않았더라도 FrontEnd에서는 유사한 환경으로 테스트 하기 위해 이 파일을 생성하였음
 */

const authApiMock = () => {
  /** 로그인 */
  async function signIn(userId: string, password: string) {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            message: "API Mock",
            result: {},
            status: 500,
          }),
        500 // Network delay mock: 500ms
      );
    });
  }

  /** 회원가입 */
  async function signUp(signUpInfo: SignUpInfo): Promise<APIResponse> {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            message: "API Mock",
            result: {},
            status: 500,
          }),
        500 // Network delay mock: 500ms
      );
    });
  }

  /** SNS로그인(카카오) */
  async function kakaoLogin(kakaoToken: any) {
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            message: "API Mock",
            result: {},
            status: 500,
          }),
        500 // Network delay mock: 500ms
      );
    });
  }

  return {
    signIn,
    signUp,
    kakaoLogin,
  };
};

export default authApiMock();
