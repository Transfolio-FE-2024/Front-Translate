import Router from "@pages/Router";
import { Header } from "./components/Header/Header";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function App() {
  const location = useLocation();

  let showHeader = !(
    location === "/" ||
    location === "/signup/regform" ||
    location === "/signup/interests" ||
    location === "/signup/complete" ||
    location === "/login" ||
    location === "/oauth/kakaocallback"
  );

  return (
    <>
      <Header />
      <Router />
    </>
  );
}
