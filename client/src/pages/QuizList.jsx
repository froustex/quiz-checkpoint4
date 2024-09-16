import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import Header from "../components/Header";
import "../styles/quizList.css";

export const loader = async () => {
  try {
    const fetchThemes = await fetch(
      `${import.meta.env.VITE_API_URL}/api/questions/themes`,
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    );
    const themes = await fetchThemes.json();
    return themes;
  } catch (err) {
    console.error("Erreur pendant le chargement des données, err");
    throw err;
  }
};

function HomePage() {
  const themes = useLoaderData();
  const [filterTheme, setFilterTheme] = useState("");
  const [filterDiff, setFilterDiff] = useState("");

  const handleThemeChange = (e) => {
    setFilterTheme(e.target.value);
  };

  const handleDiffChange = (e) => {
    setFilterDiff(e.target.value);
  };

  const arrayThemes = themes.flat().map((el) => el.theme);
  const extractUniqueTheme = [...new Set(arrayThemes)];
  const arrayDifficulty = themes.flat().map((el) => el.difficulty);
  const extractUniqueDifficulty = [...new Set(arrayDifficulty)];

  const filteredThemes = themes
    .filter((el) => (filterTheme ? el.theme === filterTheme : themes))
    .filter((el) => (filterDiff ? el.difficulty === filterDiff : themes));

  return (
    <>
      <Header />
      <div className="quiz-list-container">
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
        <div className="quiz-card-container">
          {filteredThemes.map((theme) => (
            <div key={`${theme.theme}-${theme.difficulty}`} className="card">
              <QuizCard theme={theme.theme} difficulty={theme.difficulty} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
