import styles from "./Header.module.scss";
import { logoIcon, menuIcon } from "./icons";
import { useState } from "react";
import MenuBar from "./components/menu-bar/MenuBar";

export const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const menuIconClickHandler = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      {showMenu && <MenuBar setOpen={setShowMenu} />}
      <div className={styles.container}>
        <div className={styles.menuIconSection} onClick={menuIconClickHandler}>
          <img src={menuIcon} className={menuIcon} />
        </div>
        <div className={styles.logoIcon}>
          <img src={logoIcon} />
        </div>
      </div>
    </>
  );
};
