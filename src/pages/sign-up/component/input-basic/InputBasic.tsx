import React from "react";
import styles from "./InputBasic.module.scss";

const InputBasic: React.FC<{
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

export default InputBasic;
