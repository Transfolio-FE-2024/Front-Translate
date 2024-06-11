import { useState } from "react";
import TextField from "../../../components/text-field/TextField";
import styles from "./SignIn.module.scss";
import MainButtonRound from "@/components/button/main-button-round/MainButtonRound";
import SnsButton from "@/components/button/sns-button/SnsButton";
import kakaoImg from "../../../assets/images/sns_kakaotalk.png";
import Layout from "@/components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { ValidationUtil } from "@/util";
// import { signIn } from "@/api/auth";

const SignIn = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = () => {
    const onError = (key: string) => alert(`${key} 값을 입력하세요.`);

    if (
      !ValidationUtil.isWhiteSpace(
        { value: id, key: "아이디", onError },
        { value: password, key: "비밀번호", onError }
      )
    ) {
      return;
    }

    // ✅ FIXME - CORS 해소되면 주석 해제 필요
    navigate("/home");
    // signIn(id, password)
    //   .then((res) => {
    //     console.log(res);
    //     if (String(res.status) === "200") {
    //       navigate("/home");
    //     } else throw new Error(`로그인 실패: ${res.message}`);
    //   })
    //   .catch((e) => {
    //     console.error("[TF_ERROR]", e);
    //     alert("오류가 발생했습니다.");
    //   });
  };

  return (
    <>
      <Layout>
        <div className={styles.container}>
          <div></div>
          <div className={styles.content}>
            <div className={styles.pageTitleSection}>
              <div className={styles.pageTitle}>Login</div>
              <div>
                <div className={styles.pageSubTitle}>프리랜서 번역가님!</div>
                <div className={styles.pageSubTitle}>로그인 해주세요</div>
              </div>
            </div>
            <div className={styles.inputSection}>
              <div className={styles.inputTitle}>아이디</div>
              <div className={styles.input}>
                <TextField
                  value={id}
                  onChange={(value) => setId(value)}
                  inputProps={{
                    onKeyDown: (e) => {
                      if (e.key === "Enter") login();
                    },
                  }}
                />
              </div>
            </div>
            <div className={styles.inputSection}>
              <div className={styles.inputTitle}>비밀번호</div>
              <div className={styles.input}>
                <TextField
                  value={password}
                  onChange={(value) => setPassword(value)}
                  hide={true}
                  inputProps={{
                    onKeyDown: (e) => {
                      if (e.key === "Enter") login();
                    },
                  }}
                />
              </div>
            </div>
            <div className={styles.buttonSection}>
              <MainButtonRound title="로그인" onClicked={login} />
            </div>
            <div className={styles.snsSignInTitle}>SNS로 시작하기</div>
            <div className={styles.snsButtonSection}>
              <SnsButton
                img={kakaoImg}
                title="카카오톡으로 시작하기"
                onClicked={() => {}}
              />
            </div>
          </div>
          <div></div>
        </div>
      </Layout>
    </>
  );
};

export default SignIn;
