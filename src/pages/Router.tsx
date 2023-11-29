import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout/Layout";
import Complete from "./sign-up/pages/complete/Complete";
import Interests from "./sign-up/pages/interests/Interests";
import RegForm from "./sign-up/pages/reg-from/RegForm";
import Home from "./Home/Home";
import Login from "@pages/User/Login";
import KCallback from "@/components/Oauth/KCallback";
import ContentDetail from "./content-detail/ContentDetail";
import WriterDetail from "./writer-detail/WriterDetail";
import Main from "./main/Main";
import Portfolio from './Portfolio/Portfolio';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup/regform" element={<RegForm />} />
      <Route path="/signup/interests" element={<Interests />} />
      <Route path="/signup/complete" element={<Complete />} />
      <Route path="/login" element={<Login />} />
      <Route path="/oauth/kakaocallback" element={<KCallback />} />
      <Route path="/main" element={<Main />} />
      <Route path="/content-detail" element={<ContentDetail />} />
      <Route path="/writer-detail" element={<WriterDetail />} />
      <Route path='/mypage/portfolio' element={<Portfolio />} />
    </Routes>
  );
}
