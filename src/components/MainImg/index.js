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
  const [flipped, setFlipped] = useState(Array(classes.length).fill(false));
  const [donationAmount, setDonationAmount] = useState(null);
  const [classesData, setClassesData] = useState({});

  useEffect(() => {
    // Set the CSS variable for the background image
    document.documentElement.style.setProperty(
      "--background-image",
      `url(${ClassImage})`
    );
    const fetchDonationAmount = async () => {
      try {
        const response = await fetch(
          "https://school-16-donates-backend-835922863351.europe-central2.run.app/api/v1/result",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setDonationAmount(data.donates); // Assuming the API returns an object with an 'amount' field
      } catch (error) {
        console.error("Error fetching donation amount:", error);
      }
    };
    const fetchClassesData = async () => {
      try {
        const response = await fetch(
          "https://school-16-donates-backend-835922863351.europe-central2.run.app/api/v1/classes",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Classes data:", data);
        if (data.classes && typeof data.classes === "object") {
          setClassesData(data.classes);
        } else {
          setClassesData({});
        }
      } catch (error) {
        console.error("Error fetching classes data:", error);
        setClassesData({});
      }
    };

    fetchDonationAmount();
    fetchClassesData();
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
          const shouldFlip = classesData[value];
          return (
            <div
              key={index}
              className={`${styles.chessSquare} ${
                shouldFlip ? styles.flipped : ""
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
        <h1>
          Дякуємо за донат! Вже зібрано :{" "}
          {donationAmount !== null ? donationAmount : "Loading..."}
          &#8372; (гривень)
        </h1>
      </div>
    </div>
  );
}

export default MainImg;
