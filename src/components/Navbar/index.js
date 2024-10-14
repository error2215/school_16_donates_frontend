import React from "react";
import * as styles from "./styles.module.scss";
import donateImage from "../../../static/img/donate.png"; // Adjust the path as needed

function Navbar() {
  return (
    <div>
      <nav className={styles.navbar}>
        <h1>Щоб відкрити фотографію, натисність на свій клас </h1>
        <img src={donateImage} alt="donate" className={styles.donateImg} />
      </nav>
    </div>
  );
}

export default Navbar;
