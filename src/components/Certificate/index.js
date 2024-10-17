import React, { useState, useEffect } from "react";
import * as styles from "./styles.module.scss";

const CertificateFetcher = ({ userId }) => {
  const [certificateUrl, setCertificateUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage

        const response = await fetch(
          `https://school-16-donates-backend-835922863351.europe-central2.run.app/api/v1/user/certificate?user_id=${encodeURIComponent(
            userId
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setCertificateUrl(url);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [userId]);

  if (loading) {
    return <div>Завантажую...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.certificateDiv}>
      {certificateUrl && (
        <>
          <img
            src={certificateUrl}
            alt="certificate"
            style={{ width: "70%", height: "auto" }}
          />
          <a href={certificateUrl} download="certificate.png">
            <button>Завантажити сертифікат:)</button>
          </a>
        </>
      )}
    </div>
  );
};

export default CertificateFetcher;
