import React, { useCallback, useEffect, useRef } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import OutsideClickHandler from "react-outside-click-handler";
import cn from "classnames";
import styles from "./modal.module.scss";



export default function Modal({ visible, onClose, children, btn, outerStyle, btnStyle, showModal2 }) {
  const escFunction = useCallback(
    (e) => {
      if (e.type === "click") {
        e.preventDefault();
      }
      if (e.keyCode === 27) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    document.removeEventListener("click", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
      document.removeEventListener("click", escFunction, false);
    };
  }, [escFunction]);

  const scrollRef = useRef(null);

  useEffect(() => {
  }, [visible]);
  if (visible) {
    return (
      <div className={`${showModal2 ? styles.modal2 : styles.modal}`} ref={scrollRef}  >
        <div className={cn(styles.outer)} style={outerStyle}>
          <OutsideClickHandler >
            {btn && (
              <button className={styles.close} onClick={onClose} style={btnStyle}>
                close
              </button>
            )}
            {children}
          </OutsideClickHandler>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
