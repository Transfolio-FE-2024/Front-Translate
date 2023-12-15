import React from "react";
import styles from "./Layout.module.scss";
import { useMediaQuery } from "react-responsive";

const Layout: React.FC<{ children: any }> = ({ children }) => {
  const minWidth1440 = useMediaQuery({ minWidth: 1440 });
  return (
    <>
      <div className={minWidth1440 ? styles.container : styles.minContainer}>
        {children}
      </div>
    </>
  );
};

export default Layout;
