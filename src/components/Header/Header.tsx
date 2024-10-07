import React from "react";
import styles from "./Header.module.scss";
import logoIcon from "@/assets/images/ico_logo.png";
import { useState } from "react";
import MenuBar from "./components/menu-bar/MenuBar";
import { IoMdSearch } from "react-icons/io";
import TextField from "./components/text-field/TextField";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);

  const menuIconClickHandler = () => {
    setShowMenu(!showMenu);
  };

  const searchIconClickHandler = () => {
    setShowSearchInput(!showSearchInput);
  };

  return (
    <React.Fragment>
      {showMenu && <MenuBar setOpen={setShowMenu} />}
      <div className={styles.container}>
        <div className={styles.menuSection}>
          <div
            className={styles.menuIconSection}
            onClick={menuIconClickHandler}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
          <Link to={"/home"}>
            <div
              className={styles.logoIcon}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <img src={logoIcon} />
            </div>
          </Link>
        </div>
        <div className={styles.buttonsSection}>
          <button
            onClick={() => {
              navigate("/home/portfolio");
            }}
            className={styles.writeButton}
          >
            글쓰기
          </button>
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
    </React.Fragment>
  );
};
