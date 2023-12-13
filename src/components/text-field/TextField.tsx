import React from "react";
import styles from "./TextField.module.scss";

const TextField: React.FC<{
  value: string;
  onChange: (value: string) => void;
  hide?: boolean;
  placeholder?: string;
}> = ({ value, onChange, hide = false, placeholder = "" }) => {
  return (
    <>
      <div className={styles.container}>
        <input
          className={styles.input}
          type={hide ? "password" : "text"}
          defaultValue={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default TextField;
