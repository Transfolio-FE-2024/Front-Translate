import React, { ReactNode, useContext, useEffect, useRef } from "react";
import styles from "./Header.module.scss";
import logoIcon from "@/assets/images/ico_logo.png";
import { useState } from "react";
import MenuBar from "./components/menu-bar/MenuBar";
import { IoMdClose, IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import HeaderMenuContext from "@/context/HeaderMenuContext";

export const Header = () => {
  const headerMenuContext = useContext(HeaderMenuContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const defaultButtons: ReactNode = (
      <>
        <button onClick={handleClickWrite} className={styles.writeButton}>
          글쓰기
        </button>
        <div className={styles.searchButton} onClick={toggleShowSearchInput}>
          <IoMdSearch className={styles.icon} />
        </div>
      </>
    );

    headerMenuContext.setDefaultButtons(defaultButtons);
  }, []);

  useEffect(() => {
    // 검색창 열렸을 때
    if (showSearchInput) {
      // 스크롤 막기
      document.documentElement.style.overflowY = "hidden";
      searchInputRef.current?.focus();
    }
    // 검색창 닫혔을 때
    else {
      // 스크롤 정상화
      document.documentElement.style.overflowY = "auto";
    }
  }, [showSearchInput]);

  const doSearch = () => {
    // FIXME 검색 로직
    alert(`검색 기능 미구현 (검색어: ${searchValue})`);
    setShowSearchInput(false);
  };

  const menuIconClickHandler = () => {
    setShowMenu(!showMenu);
  };

  const toggleShowSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  const handleClickLogo = () => window.scrollTo(0, 0);

  const handleClickWrite = () => navigate("/home/portfolio");

  const handleClickSearchInputWrapper = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.currentTarget === e.target) setShowSearchInput(false);
  };

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyUpSearchInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      doSearch();
    } else if (e.key === "Escape") {
      setShowSearchInput(false);
    }
  };

  return (
    <React.Fragment>
      {showMenu && <MenuBar setOpen={setShowMenu} />}
      <div className={styles.container}>
        <div className={styles.menuSection}>
          <div className={styles.menuIcon} onClick={menuIconClickHandler}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <Link to={"/home"}>
            <div className={styles.logoIcon} onClick={handleClickLogo}>
              <img src={logoIcon} />
            </div>
          </Link>
        </div>
        <div className={styles.buttonsSection}>{headerMenuContext.buttons}</div>
        {/* 오버레이 검색창 */}
        {showSearchInput && (
          <div
            className={styles.searchOveraySection}
            onClick={handleClickSearchInputWrapper}
          >
            <div className={styles.searchInputSection}>
              <input
                className={styles.searchInput}
                ref={searchInputRef}
                type="text"
                onChange={handleChangeSearchInput}
                onKeyUp={handleKeyUpSearchInput}
              />
              <div className={styles.searchButton} onClick={doSearch}>
                <IoMdSearch className={styles.icon} />
              </div>
              <div
                className={styles.closeButton}
                onClick={toggleShowSearchInput}
              >
                <IoMdClose className={styles.icon} />
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
