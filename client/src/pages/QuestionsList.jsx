import { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import "../styles/questionsList.css";

function QuestionsList() {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Erreur de chargement");
      }
      const data = await response.json();
      setQuestions(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="questions-container">
      <div className="tilte-questions">
        <h2>Questions</h2>
      </div>
      <div className="question-part">
        {questions.map((question) => (
          <QuestionCard question={question} key={question.id} />
        ))}
      </div>
    </div>
  );
}

export default QuestionsList;
