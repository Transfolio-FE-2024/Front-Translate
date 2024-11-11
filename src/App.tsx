import router from "@pages/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import "@/styles/global.scss";
import { CookieManager } from "./util";
import { TF } from "./util/const";

const queryClient = new QueryClient();

export default function App() {
  // FIXME - 로그인 정상화 시 아래 코드 제거
  if (document && !CookieManager.get(document, TF.KEY.COOKIE.TOKEN)) {
    CookieManager.set(
      document,
      TF.KEY.COOKIE.TOKEN,
      "jwtToken=eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbklkIjoiYWNjb3VudFRlc3QiLCJpYXQiOjE3Mjk5MzkxOTAsImV4cCI6MTcyOTk0NDE5MH0.5pfKXbk4yykZdN5gfYKh-m_k9jkpbRZ0R3BONs2J330; Path=/; Max-Age=36000;"
    );
  }
  //
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
