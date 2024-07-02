import React from "react";
import styles from "./DefaultLoading.module.scss";

const DefaultLoading: React.FC = () => {
  return (
    <div className={`d-flex justify-content-center ${styles.container}`}>
      <div className={`spinner-border`} role="status">
        <span className={`visually-hidden`}>Loading...</span>
      </div>
    </div>
  );
};

export default DefaultLoading;
