import Layout from "@/components/Layout/Layout";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

// 경로 바뀔 때 스크롤 지점 최상단으로 이동
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Root = () => {
  return (
    <Layout>
      <ScrollToTop />
      <Outlet />
    </Layout>
  );
};

export default Root;
