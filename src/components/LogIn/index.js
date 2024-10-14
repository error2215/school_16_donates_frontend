import React, { useState } from "react";
import * as styles from "./styles.module.scss";
import registrationImage from "../../../static/img/registration.png";

function LogIn({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPasswordError("");
    setLoginError("");

    try {
      const response = await fetch(
        `https://school-16-donates-backend-835922863351.europe-central2.run.app/api/v1/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            password: formData.password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result.token) {
        // Calculate the expiration time (48 hours from now)
        const expirationTime = new Date().getTime() + 72 * 60 * 60 * 1000;

        // Store the JWT token and expiration time in local storage
        localStorage.setItem("token", result.token);
        localStorage.setItem("tokenExpiration", expirationTime);

        // Handle successful login logic here
        onClose();
      } else {
        setLoginError("Неправильне ім'я або пароль");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginError("Помилка під час входу");
    }
  };

  // Function to get the token and check if it has expired
  const getToken = () => {
    const token = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("tokenExpiration");

    if (!token || !expirationTime) {
      return null;
    }

    const now = new Date().getTime();
    if (now > expirationTime) {
      // Token has expired, remove it from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      return null;
    }

    return token;
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
      {loginError && <p className={styles.error}>{loginError}</p>}
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
