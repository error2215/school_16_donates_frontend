import React from "react";
import * as styles from "./styles.module.scss"; // Assuming you have some CSS for styling

const TestComponent = ({ onClose }) => {
  return (
    <div className={styles.testComponent}>
      <span className={styles.closeButton} onClick={onClose}>
        &times;
      </span>
      <p>This is the test content!</p>
      {/* Add your test content here */}
    </div>
  );
};

export default TestComponent;
