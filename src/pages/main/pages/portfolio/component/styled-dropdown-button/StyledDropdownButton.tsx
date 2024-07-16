import React from "react";
import styles from "./StyledDropdownButton.module.scss";

const StyledDropdownButton: React.FC<{
  title: string | React.ReactNode;
  options: { [key: string]: string };
  selectedOptionKey: string | undefined;
  onOptionClicked: (
    selectedOptionKey: string,
    selectedOptionValue: string
  ) => void;
}> = ({ title, options, selectedOptionKey, onOptionClicked }) => {
  return (
    <div className={`btn-group`}>
      <button
        className={`btn ${styles.button}`}
        type="button"
        data-bs-toggle="dropdown"
        data-bs-display="static"
        aria-expanded="false"
      >
        {title}
      </button>
      <ul className={`dropdown-menu border-0 shadow-sm ${styles.dropdown}`}>
        {Object.keys(options).map((optionKey) => (
          <li
            key={optionKey}
            style={{ fontFamily: optionKey }}
            className={`dropdown-item ${styles.dropdownContent} ${
              selectedOptionKey !== undefined && selectedOptionKey === optionKey
                ? styles.active
                : ""
            }`}
            onClick={() => onOptionClicked(optionKey, options[optionKey])}
          >
            {options[optionKey]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StyledDropdownButton;
