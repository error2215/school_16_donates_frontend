import React, { useState, useEffect } from "react";
import * as styles from "./styles.module.scss";
import TestComponent from "../TestComponent";
import Certificate from "../Certificate";

function VideoModal({ onClose, id, userIds, userValues }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(-1); // Start with -1 to show the opening video first
  const [showTestComponent, setShowTestComponent] = useState(false);
  const [number, setNumber] = useState(0);
  const [noQuestions, setNoQuestions] = useState(false);
  const [allDone, setAllDone] = useState(false); // New state variable

  const videoUrls = [
    "https://www.youtube.com/embed/cVgIEjytVIA",
    "https://www.youtube.com/embed/5oE3PDFBpH4",
    "https://www.youtube.com/embed/Zc2H5a9M51w",
    "https://www.youtube.com/embed/9W98i5yXzQw",
    "https://www.youtube.com/embed/MPiYuN1vFBo",
    "https://www.youtube.com/embed/2eEvq1eAb4I",
    "https://www.youtube.com/embed/RKiVTVRgInw",
  ];

  useEffect(() => {
    console.log("userids", userIds);
    console.log("uservalues", userValues);
    if (userIds !== undefined && userValues !== undefined) {
      console.log("id index  " + userValues[userIds.indexOf(id)]);
    }
    const fetchTestNumber = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage

        const response = await fetch(
          `https://school-16-donates-backend-835922863351.europe-central2.run.app/api/v1/user/test_number?user_id=${encodeURIComponent(
            id
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        // Set the current video index based on the result
        setNumber(result);
      } catch (error) {
        console.error("Failed to fetch test number:", error);
      }
    };

    fetchTestNumber();
  }, [id]);

  const handleTestButtonClick = () => {
    setShowTestComponent(true);
  };

  const handleCloseTestComponent = () => {
    setShowTestComponent(false);
    if (currentVideoIndex < videoUrls.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      setAllDone(true); // Show message instead of closing the modal
    }
  };

  const handleNextVideo = () => {
    setShowTestComponent(false);
    if (currentVideoIndex < videoUrls.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      setAllDone(true); // Show message instead of closing the modal
    }
  };

  const showVideo = () => {
    if (userIds !== undefined && userValues !== undefined) {
      const userIndex = userIds.indexOf(id);
      const userValue = userValues[userIndex];

      if (userValue) {
        return <Certificate userId={id} />; // Render the Certificate component if userValue is true
      }
    }
    if (noQuestions || number > 7) {
      return (
        <div className={styles.noQuestionsMessage}>
          No more videos or tests available.
        </div>
      );
    }

    return (
      <>
        <iframe
          width="500"
          height="315"
          src={videoUrls[currentVideoIndex]}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button className={styles.actionButton} onClick={handleTestButtonClick}>
          Перейти далі
        </button>
      </>
    );
  };

  function showOpeningVideo() {
    return (
      <>
        <iframe
          width="500"
          height="315"
          src="https://www.youtube.com/embed/3A5j0qKs6u0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button
          className={styles.actionButton}
          onClick={() => {
            if (number === 7) {
              setAllDone(true);
            } else {
              setCurrentVideoIndex(number);
            }
          }}
        >
          Перейти далі
        </button>
      </>
    );
  }

  return (
    <div className={styles.videoModal}>
      <div className={styles.videoModalContent}>
        {allDone || noQuestions || number > 7 ? (
          <div className={styles.noQuestionsMessage}>
            Дякуємо за відповідь і за вашу увагу! Для отримання сертифікату
            зробіть донат і повідомте про це класного керівника.
          </div>
        ) : showTestComponent ? (
          <TestComponent
            onClose={handleCloseTestComponent}
            id={id}
            onNextVideo={handleNextVideo}
            setNoQuestions={setNoQuestions}
            noQuestions={noQuestions}
            number={number}
          />
        ) : currentVideoIndex === -1 ? (
          showOpeningVideo()
        ) : (
          showVideo()
        )}
      </div>
    </div>
  );
}

export default VideoModal;
