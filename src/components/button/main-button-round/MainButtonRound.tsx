import React from "react";
import styles from "./MainButtonRound.module.scss";
import { className } from "@/util";

const MainButtonRound: React.FC<{
  title: string;
  onClicked: () => void;
  enable?: boolean;
  fillColor?: string;
}> = ({ title, onClicked, enable = true, fillColor = "" }) => {
  return (
    <div
      className={className(
        styles.container,
        enable ? styles.enable : styles.disable
      )}
      style={{ backgroundColor: fillColor ? `${fillColor} !important` : "" }}
      onClick={() => {
        if (enable) {
          onClicked();
        }
      }}
    >
      {title}
    </div>
  );
};

export default MainButtonRound;
