import React from "react";
import styles from "./DropdownButton.module.scss";

const DropdownButton: React.FC<{
  title: string;
  values: string[];
  onValueClicked: (value: string) => void;
}> = ({ title, values, onValueClicked }) => {
  const dropdownContentClickHandler = (value: string) => {
    onValueClicked(value);
  };

  return (
    <>
      <div className="btn-group">
        <button
          type="button"
          className={`btn ${styles.button}`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {title}
        </button>
        <span className="visually-hidden">Toggle Dropdown</span>
        <ul className="dropdown-menu">
          {values.map((value, index) => (
            <li
              className={`dropdown-item ${styles.dropdownContent}`}
              onClick={() => dropdownContentClickHandler(value)}
              key={index}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DropdownButton;
