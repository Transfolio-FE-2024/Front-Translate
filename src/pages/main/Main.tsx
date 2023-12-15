import { Header } from "@/components/header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Content from "./pages/content/Content";
import Writer from "./pages/writer/Writer";
import Portfolio from "./pages/portfolio/Portfolio";
import Layout from "@/components/layout/Layout";

const Main = () => {
  return (
    <>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/content" element={<Content />} />
          <Route path="/writer" element={<Writer />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Layout>
    </>
  );
};

export default Main;
