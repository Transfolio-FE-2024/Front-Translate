import styles from "./Button.module.scss";
import { React } from "react";

const Button: React.FC<{
  title: string;
  onButtonClicked: () => void;
}> = ({ title, onButtonClicked }) => {
  return (
    <>
      <div className={styles.container} onClick={onButtonClicked}>
        {title}
      </div>
    </>
  );
};

export default Button;
