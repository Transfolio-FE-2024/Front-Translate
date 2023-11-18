import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout/Layout";
import Complete from "./sign-up/pages/complete/Complete";
import Interests from "./sign-up/pages/interests/Interests";
import RegForm from "./sign-up/pages/reg-from/RegForm";
import Home from "./Home/Home";
import Login from "@pages/User/Login";
import KCallback from "@/components/Oauth/KCallback";
import Detail from "./detail/Detail";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup/regform" element={<RegForm />} />
      <Route path="/signup/interests" element={<Interests />} />
      <Route path="/signup/complete" element={<Complete />} />
      <Route path="/login" element={<Login />} />
      <Route path="/oauth/kakaocallback" element={<KCallback />} />
      <Route path="/detail" element={<Detail />} />
    </Routes>
  );
}
