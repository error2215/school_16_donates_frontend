import React, { useEffect, useState } from "react";
import * as styles from "./styles.module.scss";
import RegistrationForm from "../RegistrationForm"; // Import the RegistrationForm component
import ProgressBar from "../ProgressBar"; // Import the ProgressBar component
import LogIn from "../LogIn";
import CertificateFetcher from "../Certificate";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function Modal({ onClose, classId, isVisible }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isClosing, setIsClosing] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [id, setId] = useState();
  const [flipped, setFlipped] = useState(Array(20).fill(false)); // Default to not flipped
  const [userIds, setUserIds] = useState([]);
  const [userValues, setUserValues] = useState([]);
  let progress = 0;

  const classesUrl = {
    "1A": "/1A.jpg",
    "1Б": "/1B.jpg",
    "2А": "/2A.jpg",
    "2Б": "/2B.jpg",
    "2В": "/2V.jpg",
    "3А": "/3A.jpg",
    "3Б": "/3B.jpg",
    "3В": "/3V.jpg",
    "4А": "/4A.jpg",
    "4Б": "/4B.jpg",
    "5А": "/5A.jpg",
    "5Б": "/5B.jpg",
    "6А": "/6A.jpg",
    "6Б": "/6B.jpg",
    "6В": "/6V.jpg",
    "7А": "/7A.jpg",
    "7Б": "/7B.jpg",
    "7В": "/7V.jpg",
    "8А": "/8A.jpg",
    "8Б": "/8B.jpg",
    "9А": "/9A.jpg",
    "9Б": "/9B.jpg",
    "10А": "/10A.jpg",
    "10Б": "/10B.jpg",
    11: "/11.jpg",
  };

  const backgroundImageUrl = classesUrl[classId];

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling when modal is open
      setIsClosing(false);
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
          console.log("User IDs:", JSON.stringify(data));
          if (data.users && typeof data.users === "object") {
            setUserIds(Object.keys(data.users));
            setUserValues(Object.values(data.users));
          } else {
            setUserIds([]);
            setUserValues([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching user IDs:", error);
          setUserIds([]);
          setUserValues([]);
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
  }, [isVisible, isClosing, classId]);

  useEffect(() => {}, [userIds]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500); // Duration of the bounce-out animation
  };

  const handleMiniSquareClick = (miniIndex) => {
    const newId = `${classId}-${miniIndex.toString()}`;
    setId(newId);
    setShowRegistrationForm(true);
    setShowLogIn(userIds.includes(newId));
    setFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[miniIndex] = !newFlipped[miniIndex];
      return newFlipped;
    });
  };

  userValues.forEach((haveDonate) => {
    if (haveDonate) {
      progress += 5;
    }
  });

  useEffect(() => {
    if (progress >= 80) {
      setFlipped(Array(20).fill(true));
    }
  }, [progress]);

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
          showLogIn ? (
            <LogIn
              classId={classId}
              onClose={handleClose}
              userIds={userIds}
              userValues={userValues}
            />
          ) : (
            <RegistrationForm
              classId={classId}
              id={id}
              onClose={handleClose}
              userValues={userValues}
            />
          )
        ) : (
          // <LogIn onClose={handleClose} />
          <div className={styles.miniBoard}>
            {Array(20)
              .fill(null)
              .map((_, miniIndex) => {
                const row = Math.floor(miniIndex / 5);
                const col = miniIndex % 5;
                const backgroundPosition = `${col * -160}px ${row * -100}px`;
                const mobileBackgroundPosition = `${col * -80}px ${
                  row * -50
                }px`;
                const userIndex = userIds.indexOf(
                  `${classId}-${miniIndex.toString()}`
                );
                const haveDonate = userValues[userIndex];
                return (
                  <div
                    key={miniIndex}
                    className={`${styles.miniSquare} ${
                      flipped[miniIndex] || haveDonate ? styles.flipped : ""
                    } `}
                    onClick={() => handleMiniSquareClick(miniIndex)}
                  >
                    <div className={styles.miniSquareInner}>
                      <div
                        className={`${styles.miniSquareFront} 
                      
                          ${
                            userIds.includes(
                              `${classId}-${miniIndex.toString()}`
                            )
                              ? styles.disabled
                              : ""
                          }`}
                      >
                        {userIds.includes(`${classId}-${miniIndex.toString()}`)
                          ? "Зайнято"
                          : miniIndex + 1}
                      </div>
                      <div
                        className={styles.miniSquareBack}
                        style={{
                          backgroundPosition: isMobile
                            ? mobileBackgroundPosition
                            : backgroundPosition,
                          backgroundImage: `url(${backgroundImageUrl})`,
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
