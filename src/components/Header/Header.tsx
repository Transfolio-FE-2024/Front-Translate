import styles from "./Header.module.scss";
import { logoIcon, menuIcon } from "./icons";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import MenuBar from "./components/menu-bar/MenuBar";
import Button from "./components/button/Button";
import { IoMdSearch } from "react-icons/io";
import TextField from "./components/text-field/TextField";

export const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);

  const menuIconClickHandler = () => {
    setShowMenu(!showMenu);
  };

  const searchIconClickHandler = () => {
    setShowSearchInput(!showSearchInput);
  };

  return (
    <>
      {showMenu && <MenuBar setOpen={setShowMenu} />}
      <div className={styles.container}>
        <div className={styles.menuSection}>
          <div
            className={styles.menuIconSection}
            onClick={menuIconClickHandler}
          >
            <img src={menuIcon} className={menuIcon} />
          </div>
          <div className={styles.logoIcon}>
            <img src={logoIcon} />
          </div>
        </div>
        <div className={styles.buttonsSection}>
          <div className={styles.writeButtonSection}>
            <Button title={"글쓰기"} onButtonClicked={() => {}} />
          </div>
          {showSearchInput && (
            <div className={styles.searchInputSection}>
              <TextField />
            </div>
          )}
          <div
            className={styles.searchButtonSection}
            onClick={searchIconClickHandler}
          >
            <IoMdSearch className={styles.searchIcon} />
          </div>
        </div>
      </div>
    </>
  );
};
