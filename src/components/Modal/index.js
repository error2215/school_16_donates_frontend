import React, { useEffect, useState } from "react";
import * as styles from "./styles.module.scss";
import ClassImage from "../../../static/img/class.png"; // Adjust the path as needed
import RegistrationForm from "../RegistrationForm"; // Import the RegistrationForm component
import ProgressBar from "../ProgressBar"; // Import the ProgressBar component
import LogIn from "../LogIn";

function Modal({ onClose, classId, isVisible }) {
  const [isClosing, setIsClosing] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [id, setId] = useState();
  const [flipped, setFlipped] = useState(Array(20).fill(false)); // Default to not flipped
  const [userIds, setUserIds] = useState([]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling when modal is open
      setIsClosing(false);
      console.log("classId", classId);
      // Fetch the list of user IDs from the API
      fetch(
        `https://school-16-donates-backend-835922863351.europe-central2.run.app/api/v1/class/users?class_id=${encodeURIComponent(
          classId
        )}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setUserIds(data.users);
          console.log("data " + data.users);
        })
        .catch((error) => {
          console.error("Error fetching user IDs:", error);
        });
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

  const handleMiniSquareClick = (miniIndex) => {
    setShowRegistrationForm(true);
    setId(miniIndex.toString());
    setFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[miniIndex] = !newFlipped[miniIndex];
      return newFlipped;
    });
  };

  const flippedCount = flipped.filter(Boolean).length;
  const progress = (flippedCount / flipped.length) * 100;

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
          <RegistrationForm classId={classId} id={id} onClose={handleClose} />
        ) : (
          // <LogIn onClose={handleClose} />
          <div className={styles.miniBoard}>
            {Array(20)
              .fill(null)
              .map((_, miniIndex) => {
                const row = Math.floor(miniIndex / 5);
                const col = miniIndex % 5;
                const backgroundPosition = `${col * -100}px ${row * -125}px`;
                console.log(userIds.includes(miniIndex.toString()));
                return (
                  <div
                    key={miniIndex}
                    className={`${styles.miniSquare} ${
                      flipped[miniIndex] ? styles.flipped : ""
                    } ${
                      userIds.includes(miniIndex.toString())
                        ? styles.disabled
                        : ""
                    }`}
                    onClick={() => handleMiniSquareClick(miniIndex)}
                  >
                    <div className={styles.miniSquareInner}>
                      <div className={styles.miniSquareFront}>
                        {userIds.includes(miniIndex.toString())
                          ? "Зайнято"
                          : miniIndex + 1}
                      </div>
                      <div
                        className={styles.miniSquareBack}
                        style={{
                          backgroundPosition,
                          backgroundImage: `url(${ClassImage})`,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      {showRegistrationForm ? null : <ProgressBar progress={progress} />}
    </div>
  );
}

export default Modal;
