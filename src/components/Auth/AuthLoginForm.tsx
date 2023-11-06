import AuthTitle from "@components/Title/AuthTitle";

export default function AuthLoginForm() {
  return (
    <>
      <AuthTitle mainTitle="Login" subTitle="로그인" />

      <form>
        <label htmlFor="id">아이디</label>
        <input id="id" type="text" placeholder="아이디를 입력해 주세요" />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
        />
        <button type="submit">로그인</button>
      </form>
    </>
  );
}
