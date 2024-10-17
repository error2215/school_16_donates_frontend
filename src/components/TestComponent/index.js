import React, { useEffect, useState } from "react";
import * as styles from "./styles.module.scss"; // Import the CSS module

const TestComponent = ({
  onClose,
  id,
  onNextVideo,
  setNoQuestions,
  noQuestions,
  number,
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [resultMessage, setResultMessage] = useState("");
  const [allCorrect, setAllCorrect] = useState(false);

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
        if (result.length === 0) {
          setNoQuestions(true);
        } else {
          setData(result);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, setNoQuestions]);

  const handleCheckboxChange = (questionIndex, answerIndex) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const currentAnswers = prevSelectedAnswers[questionIndex] || [];
      if (currentAnswers.includes(answerIndex)) {
        // Remove the answer if it's already selected
        return {
          ...prevSelectedAnswers,
          [questionIndex]: currentAnswers.filter(
            (index) => index !== answerIndex
          ),
        };
      } else {
        // Add the answer if it's not selected
        return {
          ...prevSelectedAnswers,
          [questionIndex]: [...currentAnswers, answerIndex],
        };
      }
    });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    let allCorrect = true;
    data.forEach((question, questionIndex) => {
      const correctAnswers = question.answers
        .map((answer, index) => (answer.is_correct ? index : null))
        .filter((index) => index !== null);
      const userAnswers = selectedAnswers[questionIndex] || [];
      if (
        correctAnswers.length === userAnswers.length &&
        correctAnswers.every((index) => userAnswers.includes(index))
      ) {
        correctCount++;
      } else {
        allCorrect = false;
      }
    });

    setResultMessage(
      `Ти відповів(ла) на ${correctCount} з ${data.length} питань правильно.`
    );
    setAllCorrect(allCorrect);
  };

  const handlePostResults = async () => {
    const token = localStorage.getItem("token"); // Get the token from localStorage

    const response = await fetch(
      `https://school-16-donates-backend-835922863351.europe-central2.run.app/api/v1/user/test`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: id }),
      }
    );

    if (response.ok && number <= 7) {
      onNextVideo(); // Call the function to open the next video
    } else {
      <div className={styles.noQuestionsMessage}>No questions available.</div>;
    }
  };

  if (loading) {
    return <div>Завантажую...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.testComponent}>
      {data.map((question, questionIndex) => (
        <div key={questionIndex} className={styles.questionBlock}>
          <p>{question.question}</p>
          {question.answers.map((answer, answerIndex) => (
            <div key={answerIndex} className={styles.answerBlock}>
              <label>
                <input
                  type="checkbox"
                  checked={
                    selectedAnswers[questionIndex] &&
                    selectedAnswers[questionIndex].includes(answerIndex)
                  }
                  onChange={() =>
                    handleCheckboxChange(questionIndex, answerIndex)
                  }
                />
                {answer.text}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Підтвердити</button>
      {resultMessage && (
        <div className={styles.resultMessage}>{resultMessage}</div>
      )}
      {allCorrect && (
        <button onClick={handlePostResults} className={styles.postButton}>
          Наступне питання!
        </button>
      )}
    </div>
  );
};

export default TestComponent;
