import React from "react";
import styles from "./ArrowDropdownButton.module.scss";

const ArrowDropdownButton: React.FC<{
  title: string;
  values: string[];
  selectedValue: string | null;
  onValueClicked: (value: string) => void;
  isFontFamily?: boolean;
}> = ({
  title,
  values,
  selectedValue,
  onValueClicked,
  isFontFamily = true,
}) => {
  const dropdownContentClickHandler = (value: string) => {
    onValueClicked(value);
  };

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
        {isFontFamily && (
          <ul className="dropdown-menu">
            {values.map((value, index) => (
              <li
                className={`dropdown-item ${styles.dropdownFontContent} ${
                  selectedValue === value ? styles.active : null
                }`}
                onClick={() => dropdownContentClickHandler(value)}
                key={index}
              >
                {value}
              </li>
            ))}
          </ul>
        )}
        {!isFontFamily && (
          <ul className="dropdown-menu">
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
        )}
      </div>
    </>
  );
};

export default ArrowDropdownButton;
