import React, { useState } from "react";
import * as styles from "./styles.module.scss";
import registrationImage from "../../../static/img/registration.png";
import VideoModal from "../VideoModal";

function RegistrationForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    useState(false);

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
    setNameError("");

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Simulate checking if the name is already used in the backend database
    try {
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Simulate a successful response
      const response = { ok: true, json: async () => ({ exists: false }) };

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result.exists) {
        setNameError("Name is already used");
        return;
      }

      // Simulate sending data to the backend database
      const registerResponse = {
        ok: true,
        json: async () => ({ success: true }),
      };

      if (!registerResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const registerResult = await registerResponse.json();
      console.log("Success:", registerResult);
      setIsRegistrationSuccessful(true); // Indicate successful registration
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className={styles.modalContent}>
      {isRegistrationSuccessful ? (
        <VideoModal onClose={onClose} />
      ) : (
        <form className={styles.registrationForm} onSubmit={handleSubmit}>
          <h2>Реєстрація</h2>
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
          {/* <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label> */}
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
          <label>
            Підтвердіть пароль:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
          {passwordError && <p className={styles.error}>{passwordError}</p>}
          <button type="submit">Зареєструватися!</button>
          <div className={styles.registrationImageDiv}>
            <img
              className={styles.registrationImage}
              src={registrationImage}
              alt="Registration"
            />
          </div>
        </form>
      )}
    </div>
  );
}

export default RegistrationForm;
