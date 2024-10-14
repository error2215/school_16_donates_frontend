import React, { useEffect, useState } from "react";
import * as styles from "./styles.module.scss";
import kakashiImage from "../../../static/img/kakashi-hatake_2560x1440_xtrafondos.com.jpg"; // Adjust the path as needed
import RegistrationForm from "../RegistrationForm"; // Import the RegistrationForm component
import ProgressBar from "../ProgressBar"; // Import the ProgressBar component

function Modal({ onClose, isVisible }) {
  const [isClosing, setIsClosing] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling when modal is open
      setIsClosing(false);
    } else if (!isVisible && !isClosing) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        document.body.style.overflow = "auto"; // Restore background scrolling when modal is closed
      }, 500); // Duration of the bounce-out animation
    }

    // Cleanup function to reset overflow style when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisible, isClosing]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500); // Duration of the bounce-out animation
  };

  const handleMiniSquareClick = () => {
    setShowRegistrationForm(true);
  };

  return (
    <div
      className={`${styles.modal} ${
        isVisible ? styles.show : isClosing ? styles.hide : ""
      }`}
    >
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
        {showRegistrationForm ? (
          <RegistrationForm onClose={handleClose} />
        ) : (
          <div className={styles.miniBoard}>
            {Array(20)
              .fill(null)
              .map((_, miniIndex) => {
                const row = Math.floor(miniIndex / 5); // 5 columns
                const col = miniIndex % 5;
                const backgroundPosition = `${col * -100}px ${row * -125}px`; // Adjust based on grid size

                return (
                  <div
                    key={miniIndex}
                    className={styles.miniSquare}
                    style={{
                      backgroundPosition,
                      backgroundImage: `url(${kakashiImage})`,
                    }}
                    onClick={handleMiniSquareClick}
                  ></div>
                );
              })}
          </div>
        )}
      </div>
      {showRegistrationForm ? null : <ProgressBar progress={50} />}
    </div>
  );
}

export default Modal;
