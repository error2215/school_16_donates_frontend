import React, { useState, useEffect } from "react";
import * as styles from "./styles.module.scss"; // Import the CSS file for styling

const OpeningModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageUrl = "/modal.png";

  useEffect(() => {
    // Open the modal when the component mounts (first time the page is opened)
    setIsModalOpen(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <span className={styles.closeButton} onClick={closeModal}>
              &times;
            </span>
            <img
              src={imageUrl}
              alt="Modal Content"
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default OpeningModal;
