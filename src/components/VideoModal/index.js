import React, { useState } from "react";
import * as styles from "./styles.module.scss";
import TestComponent from "../TestComponent";

function VideoModal({ onClose, id }) {
  const [showTestComponent, setShowTestComponent] = useState(false);

  const video = [
    "https://youtu.be/cVgIEjytVIA",
    "https://youtu.be/5oE3PDFBpH4",
    "https://youtu.be/Zc2H5a9M51w",
    "https://youtu.be/9W98i5yXzQw",
    "https://www.youtube.com/watch?v=MPiYuN1vFBo&ab_channel=%D0%9C%D1%83%D0%BA%D0%B0%D1%87%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%B0%D0%A1%D0%A8%E2%84%9616%22%D0%A8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B1%D0%B5%D0%B7%D0%BF%D0%B5%D0%BA%D0%B8%22",
    "https://youtu.be/2eEvq1eAb4I",
    "https://youtu.be/RKiVTVRgInw",
  ];

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
          <TestComponent onClose={handleCloseTestComponent} id={id} />
        ) : (
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
