import { createBrowserRouter } from "react-router-dom";
import Start from "./start/Start";
import RegForm from "./auth/sign-up/pages/reg-from/RegForm";
import Interests from "./auth/sign-up/pages/interests/Interests";
import SignIn from "./auth/sign-in/SignIn";
import KCallback from "@/components/Oauth/KCallback";
import Home from "./main/pages/home/Home";
import Edit from "./main/pages/edit/Edit";
import Content from "./main/pages/content/Content";
import Writer from "./main/pages/writer/Writer";
import Portfolio from "./main/pages/portfolio/Portfolio";
import Root from "./Root";
import Complete from "./auth/sign-up/pages/complete/Complete";
import Main from "./main/Main";
import DefaultErrorBoundary from "./error/default";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <DefaultErrorBoundary />,
    children: [
      {
        path: "/",
        element: <Start />,
      },
      // 회원가입
      {
        path: "signup",
        children: [
          {
            path: "regform",
            element: <RegForm />,
          },
          {
            path: "interests",
            element: <Interests />,
          },
          {
            path: "complete",
            element: <Complete />,
          },
        ],
      },
      // 로그인
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "oauth/kakaocallback",
        element: <KCallback />,
      },
      // 메인 페이지
      {
        path: "home",
        element: <Main />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "edit",
            element: <Edit />,
          },
          {
            path: "content",
            element: <Content />,
          },
          {
            path: "writer/:writerId",
            element: <Writer />,
          },
          {
            path: "portfolio",
            element: <Portfolio />,
          },
          {
            path: "completion",
            element: <Complete />,
          },
        ],
      },
    ],
  },
]);

export default router;
