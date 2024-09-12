export interface JwtPayload {
  [key: string]: any;
}

/**
 * JWT는 점(.)으로 구분된 세 부분으로 구성
 * header, payload, signature
 */
const jwtManager = () => {
  function decodeJwt(token: string): JwtPayload | null {
    try {
      // 두 번째 부분(payload) 추출
      const base64Url = token.split(".")[1];
      // Base64 URL-safe 문자를 일반 Base64로 변환
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      // JSON 문자열을 객체로 변환
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Invalid token:", e);
      return null;
    }
  }

  return {
    decodeJwt,
  };
};

export default jwtManager();
