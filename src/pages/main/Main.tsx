import { Header } from "@/components/Header/Header";
import { Outlet } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import { Footer } from "@/components/Footer/Footer";
import { ReactNode, useState } from "react";
import HeaderMenuContext from "@/components/Header/context/HeaderMenuContext";

const Main = () => {
  const [headerButtons, setHeaderButtons] = useState<ReactNode>();
  const [defaultHeaderButtons, setDefaultHeaderButtons] = useState<ReactNode>();

  const setButtons = (buttons?: ReactNode) => {
    if (buttons) setHeaderButtons(buttons);
    else setHeaderButtons(defaultHeaderButtons);
  };

  const setDefaultButtons = (buttons: ReactNode) => {
    setHeaderButtons(buttons);
    setDefaultHeaderButtons(buttons);
  };

  return (
    <HeaderMenuContext.Provider
      value={{
        buttons: headerButtons,
        setButtons,
        setDefaultButtons,
      }}
    >
      <Layout>
        <Header />
        <Outlet />
        <Footer />
      </Layout>
    </HeaderMenuContext.Provider>
  );
};

export default Main;
