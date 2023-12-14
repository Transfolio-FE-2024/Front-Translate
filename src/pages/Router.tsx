import { Routes, Route } from "react-router-dom";
import Complete from "./auth/sign-up/pages/complete/Complete";
import Interests from "./auth/sign-up/pages/interests/Interests";
import RegForm from "./auth/sign-up/pages/reg-from/RegForm";
import Start from "./start/Start";
import KCallback from "@/components/oauth/KCallback";
import Main from "./main/Main";
import SignIn from "./auth/sign-in/SignIn";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />

      {/* 회원가입 */}
      <Route path="/signup/regform" element={<RegForm />} />
      <Route path="/signup/interests" element={<Interests />} />
      <Route path="/signup/complete" element={<Complete />} />

      {/* 로그인 */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/oauth/kakaocallback" element={<KCallback />} />

      {/* 메인 페이지 */}
      <Route path="/home/*" element={<Main />} />
    </Routes>
  );
}
