import { Header } from "@/components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Content from "./pages/content/Content";
import Writer from "./pages/writer/Writer";
import Portfolio from "./pages/portfolio/Portfolio";
import Layout from "@/components/Layout/Layout";
import Completion from "./pages/completion/Completion";
import Edit from "./pages/edit/Edit";

const Main = () => {
  return (
    <>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/content" element={<Content />} />
          <Route path="/writer/:writerId" element={<Writer />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/completion" element={<Completion />} />
        </Routes>
      </Layout>
    </>
  );
};

export default Main;
