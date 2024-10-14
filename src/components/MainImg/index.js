import React, { useState, useEffect } from "react";
import * as styles from "./styles.module.scss"; // Ensure the path is correct
import Modal from "../Modal"; // Ensure the path is correct
import kakashiImage from "../../../static/img/kakashi-hatake_2560x1440_xtrafondos.com.jpg"; // Adjust the path as needed

function MainImg() {
  const [zoomed, setZoomed] = useState(Array(20).fill(false));
  const [modalVisible, setModalVisible] = useState(false);
  const [currentZoomIndex, setCurrentZoomIndex] = useState(null);

  useEffect(() => {
    // Set the CSS variable for the background image
    document.documentElement.style.setProperty(
      "--background-image",
      `url(${kakashiImage})`
    );
  }, []);

  const handleZoom = (index) => {
    setCurrentZoomIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentZoomIndex(null);
  };

  return (
    <div className={styles.mainPage}>
      <div className={styles.chessboard}>
        {zoomed.map((_, index) => {
          const row = Math.floor(index / 5); // 5 columns
          const col = index % 5;
          const backgroundPosition = `${col * -200}px ${row * -250}px`; // Adjust based on grid size

          return (
            <div
              key={index}
              className={styles.chessSquare}
              style={{
                backgroundPosition,
                backgroundImage: `url(${kakashiImage})`,
              }}
              onClick={() => handleZoom(index)}
            >
              {index + 1}
            </div>
          );
        })}
        {modalVisible && (
          <Modal onClose={closeModal} isVisible={modalVisible}>
            <div>Zoomed Image Index: {currentZoomIndex}</div>
          </Modal>
        )}
      </div>
      <div className={styles.sum}>
        <h1>Дякуємо за донат! Вже зібрано : </h1>
      </div>
    </div>
  );
}

export default MainImg;
