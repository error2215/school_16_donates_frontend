import React, { useState } from "react";
import * as styles from "./styles.module.scss";
import registrationImage from "../../../static/img/registration.png";
import VideoModal from "../VideoModal"; // Import the VideoModal component
import CertificateFetcher from "../Certificate"; // Import the CertificateFetcher component

function LogIn({ id, classId, onClose, userIds, userValues }) {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [userBoolean, setUserBoolean] = useState(null);
  const [userData, setUserData] = useState([]);

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
        const expirationTime = new Date().getTime() + 72 * 60 * 60 * 1000;

        localStorage.setItem("token", result.token);
        localStorage.setItem("tokenExpiration", expirationTime);

        const getResponse = await fetch(
          `https://school-16-donates-backend-835922863351.europe-central2.run.app/api/v1/admin/users?class_id=${classId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${result.token}`,
            },
          }
        );

        if (!getResponse.ok) {
          setIsLoginSuccessful(true);
          throw new Error("Not admin");
        }

        const getData = await getResponse.json();
        setUserData(getData);
        setUserBoolean(true);

        setIsLoginSuccessful(true);
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

  const handleInputChange = (index, field, value) => {
    const updatedUserData = [...userData];
    updatedUserData[index][field] = value;
    setUserData(updatedUserData);
  };

  const handleCheckboxClick = async (user) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://school-16-donates-backend-835922863351.europe-central2.run.app/api/v1/admin/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div>
      {isLoginSuccessful ? (
        userBoolean ? (
          <div>
            <h1>Список учнів</h1>
            <table className={styles.userTable}>
              <thead>
                <tr>
                  <th style={{ display: "none" }}>ID</th>
                  <th>Ім'я</th>
                  <th>Пароль</th>
                  <th style={{ display: "none" }}>ClassId</th>
                  <th style={{ display: "none" }}>Admin</th>
                  <th style={{ display: "none" }}>TestBlockPass</th>

                  <th>Задонатив</th>
                  <th>Оновити</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr key={index}>
                    <td style={{ display: "none" }}>{user.id}</td>
                    <td>
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) =>
                          handleInputChange(index, "name", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={user.password}
                        onChange={(e) =>
                          handleInputChange(index, "password", e.target.value)
                        }
                      />
                    </td>
                    <td style={{ display: "none" }}>{user.class_id}</td>
                    <td style={{ display: "none" }}>{user.admin ? 1 : 0}</td>
                    <td style={{ display: "none" }}>
                      {user.test_blocks_passed}
                    </td>
                    <td>
                      <input
                        type="number"
                        value={user.donated}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "donated",
                            Number(e.target.value)
                          )
                        }
                      />
                    </td>
                    <td>
                      <button
                        type="submit"
                        onClick={() => handleCheckboxClick(user)}
                      >
                        Оновити дані
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <VideoModal
            onClose={onClose}
            id={id}
            userIds={userIds}
            userValues={userValues}
          />
          // <CertificateFetcher userId={id} />
        )
      ) : (
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
      )}
    </div>
  );
}

export default LogIn;
