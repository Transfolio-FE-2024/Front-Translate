import { Header } from "@/components/Header/Header";
import { Outlet } from "react-router-dom";
import Layout from "@/components/Layout/Layout";

const Main = () => {
  return (
    <Layout>
      <Header />
      <Outlet />
    </Layout>
  );
};

export default Main;
