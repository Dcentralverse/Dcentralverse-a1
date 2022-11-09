import React from "react";
import { Bars } from "react-loader-spinner";
import styles from "./Button.module.scss";

function Button({ primary, children, onClick, disabled, type }) {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={primary ? styles.primary : styles.secondary}
        disabled={disabled}
      >
        {disabled ? (
          <div className={styles.loaderWrapper}>
            <Bars
              height="25px"
              width="25px"
              color="#fff"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          children
        )}
      </button>
    </>
  );
}

export default Button;
