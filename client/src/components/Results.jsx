import { useEffect, useState } from "react";

function Results({ auth }) {
  const [successRate, setSuccessRate] = useState({});
  const userId = 2;

  useEffect(() => {
    const fetchSuccessRate = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${userId}/answers`,
          { credentials: "include" }
        );
        const data = await response.json();
        setSuccessRate(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSuccessRate();
  }, [userId]);

  const success = (
    (successRate.correct_sum / successRate.total_count) *
    100
  ).toFixed(2);

  return (
    auth && (
      <div style={{ textAlign: "center" }}>
        Vous avez répondu correctement à {successRate.correct_sum} questions /{" "}
        {successRate.total_count} soit {success}% de bonnes réponses
      </div>
    )
  );
}

export default Results;
