import React, { useState, useEffect } from "react";
import * as styles from "./styles.module.scss"; // Ensure the path is correct
import Modal from "../Modal"; // Ensure the path is correct
import ClassImage from "../../../static/img/class.png"; // Adjust the path as needed

function MainImg() {
  const classes = [
    "1А",
    "1Б",
    "2А",
    "2Б",
    "2В",
    "3А",
    "3Б",
    "3В",
    "4А",
    "4Б",
    "5А",
    "5Б",
    "6А",
    "6Б",
    "6В",
    "7А",
    "7Б",
    "7В",
    "8А",
    "8Б",
    "9А",
    "9Б",
    "10А",
    "10Б",
    "11",
  ];

  const [zoomed, setZoomed] = useState(classes);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentZoomIndex, setCurrentZoomIndex] = useState(null);
  const [classId, setClassId] = useState(null);
  const [flipped, setFlipped] = useState(Array(classes.length).fill(false)); // Default to flipped

  useEffect(() => {
    // Set the CSS variable for the background image
    document.documentElement.style.setProperty(
      "--background-image",
      `url(${ClassImage})`
    );
  }, []);

  const handleZoom = (index, value) => {
    setCurrentZoomIndex(index);
    setModalVisible(true);
    setClassId(value);
    setFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentZoomIndex(null);
  };

  return (
    <div className={styles.mainPage}>
      <div className={styles.chessboard}>
        {zoomed.map((value, index) => {
          const row = Math.floor(index / 5); // 5 columns
          const col = index % 5;
          const backgroundPosition = `${col * -150}px ${row * -200}px`; // Adjust based on grid size

          return (
            <div
              key={index}
              className={`${styles.chessSquare} ${
                flipped[index] ? styles.flipped : ""
              }`}
              onClick={() => handleZoom(index, value)}
            >
              <div className={styles.chessSquareInner}>
                <div
                  className={styles.chessSquareFront}
                  style={{
                    backgroundPosition,
                    backgroundImage: `url(${ClassImage})`,
                  }}
                ></div>
                <div className={styles.chessSquareBack}>{value}</div>
              </div>
            </div>
          );
        })}
        {modalVisible && (
          <Modal
            onClose={closeModal}
            classId={classId}
            isVisible={modalVisible}
          >
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
