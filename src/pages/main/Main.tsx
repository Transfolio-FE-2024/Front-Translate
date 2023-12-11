import { Header } from "@/components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Content from "./pages/content/Content";
import Writer from "./pages/writer/Writer";
import Portfolio from "./pages/portfolio/Portfolio";

const Main = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/content" element={<Content />} />
        <Route path="/writer" element={<Writer />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </>
  );
};

export default Main;
