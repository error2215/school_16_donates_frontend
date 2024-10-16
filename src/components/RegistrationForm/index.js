import React, { useState } from "react";
import * as styles from "./styles.module.scss";
import registrationImage from "../../../static/img/registration.png";
import VideoModal from "../VideoModal";
import LogIn from "../LogIn";

function RegistrationForm({ classId, id, onClose, userValues }) {
  const [formData, setFormData] = useState({
    id: id,
    name: "",
    password: "",
    confirmPassword: "",
    class_id: classId,
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

  const checkNameAvailability = async (name) => {
    const response = await fetch(
      `https://school-16-donates-backend-835922863351.europe-central2.run.app/api/v1/user/name_is_free?name=${encodeURIComponent(
        name
      )}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result.is_free;
  };

  const registerUser = async (id, name, password, class_id) => {
    const response = await fetch(
      `https://school-16-donates-backend-835922863351.europe-central2.run.app/api/v1/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, password, class_id }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result.success;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPasswordError("");
    setNameError("");

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      const nameExists = await checkNameAvailability(formData.name);
      if (!nameExists) {
        setNameError("Такий учень вже зареєстрований");
        return;
      }

      const registrationSuccess = await registerUser(
        formData.id,
        formData.name,
        formData.password,
        formData.class_id
      );

      if (registrationSuccess) {
        setIsRegistrationSuccessful(true); // Indicate successful registration
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.modalContent}>
      {isRegistrationSuccessful ? (
        <LogIn
          onClose={onClose}
          classId={classId}
          id={id}
          userValues={userValues}
        />
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
          {nameError && <p className={styles.error}>{nameError}</p>}
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
