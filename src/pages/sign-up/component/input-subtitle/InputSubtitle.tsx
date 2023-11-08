import React from "react";
import { useState } from "react";
import styles from "./InputSubtitle.module.scss";

const InputSubtitle: React.FC<{
  value: string;
  onChange: (value: string) => void;
  text: string;
  hide?: boolean;
}> = ({ value, onChange, text, hide = false }) => {
  const [focused, setFocused] = useState<boolean>(false);

  const focuseHandler = () => {
    setFocused(true);
  };

  return (
    <>
      <div className={styles.container}>
        <input
          className={styles.input}
          type={hide ? "password" : "text"}
          defaultValue={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={focuseHandler}
        />
        {focused && <div className={styles.inputSubTitle}>{text}</div>}
      </div>
    </>
  );
};

export default InputSubtitle;
