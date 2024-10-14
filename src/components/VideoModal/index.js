import React, { useState } from "react";
import * as styles from "./styles.module.scss";
import TestComponent from "../TestComponent";

function VideoModal({ onClose }) {
  const [showTestComponent, setShowTestComponent] = useState(false);

  const handleTestButtonClick = () => {
    setShowTestComponent(true);
  };

  const handleCloseTestComponent = () => {
    setShowTestComponent(false);
  };

  return (
    <div className={styles.videoModal}>
      <div className={styles.videoModalContent}>
        {showTestComponent ? (
          <TestComponent onClose={handleCloseTestComponent} />
        ) : (
          <>
            <iframe
              width="500"
              height="315"
              src="https://www.youtube.com/embed/hrwjhHPGnfs?si=WOQW4GBv4CVnMzOO"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              className={styles.actionButton}
              onClick={handleTestButtonClick}
            >
              Перейти до тестів
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default VideoModal;
