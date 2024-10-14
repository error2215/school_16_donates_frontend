import React, { useState } from "react";
import * as styles from "./styles.module.scss";
import registrationImage from "../../../static/img/registration.png";

function LogIn({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Паролі не співпадають");
      return;
    }
    // Handle form submission logic here
    onClose();
  };

  return (
    <form className={styles.registrationForm} onSubmit={handleSubmit}>
      <h2>Вхід</h2>
      <label>
        Ім'я:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Пароль:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      {passwordError && <p className={styles.error}>{passwordError}</p>}
      <button type="submit">Увійти</button>
      <div className={styles.registrationImageDiv}>
        <img
          className={styles.registrationImage}
          src={registrationImage}
          alt="Registration"
        />
      </div>
    </form>
  );
}

export default LogIn;
