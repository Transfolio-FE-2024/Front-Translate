import React from "react";
import styles from "./ArrowDropdownButton.module.scss";

const ArrowDropdownButton: React.FC<{ title: string }> = ({ title }) => {
  return (
    <>
      <div className="btn-group">
        <button
          className={`btn dropdown-toggle ${styles.button}`}
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {title}
        </button>
        <ul className="dropdown-menu">
          <li className={`dropdown-item ${styles.dropdownContent}`}>
            Pretendard
          </li>
          <li className={`dropdown-item ${styles.dropdownContent}`}>
            Nanum Myeangjo
          </li>
          <li className={`dropdown-item ${styles.dropdownContent}`}>
            Noto sans
          </li>
          <li className={`dropdown-item ${styles.dropdownContent}`}>
            Nanum Barun Gothic
          </li>
        </ul>
      </div>
    </>
  );
};

export default ArrowDropdownButton;
