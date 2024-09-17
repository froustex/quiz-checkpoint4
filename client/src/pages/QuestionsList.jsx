import { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import "../styles/questionsList.css";

function QuestionsList() {
  const [questions, setQuestions] = useState([]);
  const [filterTheme, setFilterTheme] = useState("");
  const [filterDiff, setFilterDiff] = useState("");

  const handleThemeChange = (e) => {
    setFilterTheme(e.target.value);
  };

  const handleDiffChange = (e) => {
    setFilterDiff(e.target.value);
  };

  const arrayThemes = questions.flat().map((el) => el.theme);
  const extractUniqueTheme = [...new Set(arrayThemes)];
  const arrayDifficulty = questions.flat().map((el) => el.difficulty);
  const extractUniqueDifficulty = [...new Set(arrayDifficulty)];

  const filteredQuestions = questions
    .filter((el) => (filterTheme ? el.theme === filterTheme : questions))
    .filter((el) => (filterDiff ? el.difficulty === filterDiff : questions));

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
    <>
      <div className="select-part">
        <select onChange={handleThemeChange} value={filterTheme}>
          <option value="">THEME</option>
          {extractUniqueTheme.map((theme) => (
            <option key={theme.id}>{theme}</option>
          ))}
        </select>
        <select onChange={handleDiffChange} value={filterDiff}>
          <option value="">DIFFICULTE</option>
          {extractUniqueDifficulty.map((difficulty) => (
            <option key={difficulty.id}>{difficulty}</option>
          ))}
        </select>
      </div>
      <div className="questions-container">
        <div className="tilte-questions">
          <h2>Questions</h2>
        </div>
        <div className="question-part">
          {filteredQuestions.map((question) => (
            <QuestionCard question={question} key={question.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default QuestionsList;
