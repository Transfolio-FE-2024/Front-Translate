import React from "react";
import styles from "./TextField.module.scss";

const TextField: React.FC<{
  value: string;
  onChange: (value: string) => void;
  hide?: boolean;
}> = ({ value, onChange, hide = false }) => {
  return (
    <>
      <div className={styles.container}>
        <input
          className={styles.input}
          type={hide ? "password" : "text"}
          defaultValue={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </>
  );
};

export default TextField;
