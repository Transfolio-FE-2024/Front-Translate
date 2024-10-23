import { Header } from "@/components/Header/Header";
import { Outlet } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import { Footer } from "@/components/Footer/Footer";

const Main = () => {
  return (
    <Layout>
      <Header />
      <Outlet />
      <Footer />
    </Layout>
  );
};

export default Main;
