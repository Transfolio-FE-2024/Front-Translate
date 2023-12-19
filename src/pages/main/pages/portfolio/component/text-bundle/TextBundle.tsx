import React, { useEffect, useState } from "react";
import styles from "./TextBundle.module.scss";

const TextBundle: React.FC<{ original?: boolean }> = ({ original = true }) => {
  const [value, setValue] = useState<string>("");
  const [rows, setRows] = useState<number>(1);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!e.target.value.includes("\n")) {
      setValue(e.target.value);
    }
  };

  useEffect(() => {
    const calculateRows = () => {
      // 한 줄에 30글자로 가정
      const charsPerLine = 49;

      // 입력된 텍스트의 길이에 따라 필요한 줄 수 계산
      const calculatedRows = Math.ceil(value.length / charsPerLine);

      // 계산된 줄 수를 업데이트
      setRows(calculatedRows || 1);
    };

    calculateRows();
  }, [value]);

  return (
    <>
      <textarea
        value={value}
        onChange={handleChange}
        className={`${styles.input} ${original ? styles.original : null}`}
        rows={rows}
      />
    </>
  );
};

export default TextBundle;
