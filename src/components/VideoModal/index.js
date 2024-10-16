import React, { useState } from "react";
import * as styles from "./styles.module.scss";
import TestComponent from "../TestComponent";

function VideoModal({ onClose, id }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(-1); // Start with -1 to show the opening video first
  const [showTestComponent, setShowTestComponent] = useState(false);

  const videoUrls = [
    "https://www.youtube.com/embed/cVgIEjytVIA",
    "https://www.youtube.com/embed/5oE3PDFBpH4",
    "https://www.youtube.com/embed/Zc2H5a9M51w",
    "https://www.youtube.com/embed/9W98i5yXzQw",
    "https://www.youtube.com/embed/MPiYuN1vFBo",
    "https://www.youtube.com/embed/2eEvq1eAb4I",
    "https://www.youtube.com/embed/RKiVTVRgInw",
  ];

  const handleTestButtonClick = () => {
    setShowTestComponent(true);
  };

  const handleCloseTestComponent = () => {
    setShowTestComponent(false);
    if (currentVideoIndex < videoUrls.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      onClose(); // Close the modal if all videos are done
    }
    console.log("videourl", videoUrls[currentVideoIndex]);
  };

  const showVideo = () => (
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
        Перейти до тестів
      </button>
    </>
  );

  const showOpeningVideo = () => (
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
        onClick={() => setCurrentVideoIndex(0)}
      >
        Перейти до тестів
      </button>
    </>
  );

  return (
    <div className={styles.videoModal}>
      <div className={styles.videoModalContent}>
        {showTestComponent ? (
          <TestComponent onClose={handleCloseTestComponent} id={id} />
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
