import React, { useEffect, useState } from "react";
import * as styles from "./styles.module.scss"; // Assuming you have some CSS for styling

const TestComponent = ({ onClose, id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("id", id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage

        const response = await fetch(
          `https://school-16-donates-backend-835922863351.europe-central2.run.app/api/v1/user/test?user_id=${encodeURIComponent(
            id
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.testComponent}>
      <span className={styles.closeButton} onClick={onClose}>
        &times;
      </span>
      <p>This is the test content!</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={onClose}>Далі</button>
    </div>
  );
};

export default TestComponent;
