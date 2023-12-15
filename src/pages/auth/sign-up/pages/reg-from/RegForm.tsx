import MainButtonRound from "@/components/button/main-button-round/MainButtonRound";
import { useState } from "react";
import TextField from "../../../../../components/text-field/TextField";
import TextFieldAnnotation from "../../../../../components/text-field/text-field-annotation/TextFieldAnnotation";
import SubButton from "../../component/sub-button/SubButton";
import styles from "./RegForm.module.scss";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const RegForm = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [certificationNumber, setCertificationNumber] = useState<string>("");

  return (
    <>
      <Layout>
        <div className={styles.content}>
          <div className={styles.pageTitleSection}>
            <div className={styles.pageTitle}>Register</div>
            <div>
              <div className={styles.pageSubTitle}>프리랜서 번역가님!</div>
              <div className={styles.pageSubTitle}>회원가입 해주세요</div>
            </div>
          </div>
          <div className={styles.inputSection}>
            <div className={styles.inputTitle}>1. 아이디를 설정해주세요.</div>
            <div className={styles.inputContainer}>
              <div className={styles.inputSubTitle}>아이디</div>
              <div className={styles.input}>
                <TextField value={id} onChange={(value) => setId(value)} />
              </div>
              <div className={styles.subButton}>
                <SubButton title="중복확인" onClick={() => {}} />
              </div>
            </div>
          </div>
          <div className={styles.inputSection}>
            <div className={styles.inputTitle}>2. 비밀번호를 설정해주세요.</div>
            <div className={styles.inputContainer}>
              <div className={styles.inputSubTitle}>비밀번호 설정</div>
              <div className={styles.input}>
                <TextField
                  value={password}
                  onChange={(value) => setPassword(value)}
                  hide={true}
                />
              </div>
              <div className={styles.subButton}></div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.inputSubTitle}>비밀번호 확인</div>
              <div className={styles.input}>
                <TextFieldAnnotation
                  value={confirmPassword}
                  onChange={(value: string) => setConfirmPassword(value)}
                  text={
                    password === confirmPassword
                      ? ""
                      : "비밀번호가 일치하지 않습니다."
                  }
                  hide={true}
                />
              </div>
              <div className={styles.subButton}></div>
            </div>
          </div>
          <div className={styles.inputSection}>
            <div className={styles.inputTitle}>
              3. 인증을 위해 이메일을 입력해주세요.
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.inputSubTitle}>이메일</div>
              <div className={styles.input}>
                <TextField
                  value={email}
                  onChange={(value) => setEmail(value)}
                />
              </div>
              <div className={styles.subButton}>
                <SubButton title="인증하기" onClick={() => {}} />
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.inputSubTitle}>이메일 인증</div>
              <div className={styles.input}>
                <TextField
                  value={certificationNumber}
                  onChange={(value) => setCertificationNumber(value)}
                />
              </div>
              <div className={styles.subButton}>
                <SubButton title="인증완료" onClick={() => {}} />
              </div>
            </div>
          </div>
          <div className={styles.mainButton}>
            <MainButtonRound
              title="다음"
              onClicked={() => {
                navigate("/signup/interests");
              }}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default RegForm;
