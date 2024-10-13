import React, { useEffect, useRef, useState } from "react";
import styles from "./DropdownButton.module.scss";

const DropdownButton: React.FC<{
  title: string | React.ReactNode;
  dropdownOptions: { [key: string]: string } | string[];
  selectedOption?: { key: string; value: string };
  onOptionClicked: (key: string, value: string) => void;
  // 스타일
  buttonStyle?: React.CSSProperties;
  dropdownULStyle?: React.CSSProperties;
  dropdownLIStyle?: React.CSSProperties;
}> = ({
  title,
  dropdownOptions,
  selectedOption,
  onOptionClicked,
  buttonStyle,
  dropdownULStyle,
  dropdownLIStyle,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dropdownLeft, setDropdownLeft] = useState<number>(0);
  const buttonGroupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // 드롭다운 메뉴를 버튼 중앙에 붙이기
    if (buttonRef.current && dropdownRef.current) {
      setDropdownLeft(
        (buttonRef.current.offsetWidth - dropdownRef.current.offsetWidth) / 2
      );
    }
  });

  useEffect(() => {
    // 요소 이외의 부분 클릭 시 메뉴 숨기기
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonGroupRef.current &&
        !buttonGroupRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    // Esc 키 입력 시 메뉴 숨기기
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // 드롭다운 메뉴 아이템 그리기
  const renderDropdownOptions = () => {
    let _dropdownOptions: { [key: string]: string };

    if (Array.isArray(dropdownOptions)) {
      _dropdownOptions = {};
      dropdownOptions.forEach((option) => (_dropdownOptions[option] = option));
    } else {
      _dropdownOptions = dropdownOptions;
    }

    return Object.keys(_dropdownOptions).map((key) => (
      <li
        className={`${styles.dropdownContent} ${
          selectedOption?.key === key ? styles.active : ""
        }`}
        onClick={() => {
          onOptionClicked(key, _dropdownOptions[key]);
          setIsVisible(false);
        }}
        key={key}
        style={dropdownLIStyle}
      >
        {_dropdownOptions[key]}
      </li>
    ));
  };

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div ref={buttonGroupRef} className={styles.buttonGroup}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.button}
        style={buttonStyle}
        onClick={handleButtonClick}
      >
        {title}
      </button>
      <ul
        ref={dropdownRef}
        className={styles.dropdown}
        style={{
          visibility: isVisible ? "visible" : "hidden",
          opacity: isVisible ? 1 : 0,
          left: dropdownLeft,
          ...dropdownULStyle,
        }}
      >
        {renderDropdownOptions()}
      </ul>
    </div>
  );
};

export default DropdownButton;
