import React from "react";
import styles from "./DropdownButton.module.scss";

const DropdownButton: React.FC<{
  title: string;
  values: string[];
  selectedValue: string | null;
  onValueClicked: (value: string) => void;
}> = ({ title, values, selectedValue, onValueClicked }) => {
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
        <ul className={`dropdown-menu ${styles.dropdown}`}>
          {values.map((value, index) => (
            <li
              className={`dropdown-item ${styles.dropdownContent} ${
                selectedValue === value ? styles.active : null
              }`}
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
