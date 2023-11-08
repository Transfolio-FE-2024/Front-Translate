import styles from "./AuthLoginForm.module.scss";
import AuthTitle from "@components/Title/AuthTitle";

export default function AuthLoginForm() {
  return (
    <section className={styles.authSection}>
      <AuthTitle mainTitle="Login" subTitle="로그인" />

      <form className={styles.authForm}>
        <div className={styles.authContainer}>
          <label htmlFor="id" className={styles.authLabelId}>
            아이디
          </label>
          <input
            id="id"
            type="text"
            placeholder="아이디를 입력해 주세요"
            className={styles.authInputId}
          />
        </div>

        <div className={styles.authContainer}>
          <label htmlFor="password" className={styles.authLabelPw}>
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            className={styles.authInputPw}
          />
        </div>

        <button type="submit" className={styles.authSubmitBtn}>
          로그인
        </button>
      </form>
    </section>
  );
}
