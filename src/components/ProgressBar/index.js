import React from "react";
import * as styles from "./styles.module.scss";

function ProgressBar({ progress }) {
  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar} style={{ width: `${progress}%` }}>
        <span className={styles.progressBarText}>{progress}%</span>
      </div>
    </div>
  );
}

export default ProgressBar;
