import React from "react";
import styles from "./TextFieldLonger.module.scss";

const TextFieldLonger: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}> = ({ value, onChange, placeholder = "", maxLength = undefined }) => {
  return (
    <>
      <div className={styles.container}>
        <textarea
          className={styles.textarea}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      </div>
    </>
  );
};

export default TextFieldLonger;
