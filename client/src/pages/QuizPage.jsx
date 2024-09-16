import { useState, useEffect, useRef } from "react";
import "../styles/quizz.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../services/useAuth";

import timerSound from "../assets/sounds/timer.mp3";
import correctSound from "../assets/sounds/correct.wav";
import wrongSound from "../assets/sounds/wrong.wav";

import correctScore from "../assets/images/correctScore.jpg";
import lowScore from "../assets/images/lowScore.jpg";
import perfectScore from "../assets/images/perfectScore.jpg";

export const loader = async ({ params }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/questions/${params.theme}/${params.difficulty}`,
      { credentials: "include" }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Erreur pendant le chargement des données", err);
    throw err;
  }
};

function QuizPage() {
  const questions = useLoaderData();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [showAnswer, setShowAnswer] = useState(false);

  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  const timerAudioRef = useRef(new Audio(timerSound));
  const correctAudioRef = useRef(new Audio(correctSound));
  const wrongAudioRef = useRef(new Audio(wrongSound));

  const handleEndTimer = () => {
    setShowAnswer(true);
    timerAudioRef.current.pause();
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer(timer - 1), 1000);
      timerAudioRef.current.play();
      return () => clearInterval(countdown);
    }
    return handleEndTimer();
  }, [timer]);

  const handleAnswer = async (option) => {
    setTimer(0);

    const isAnswerCorrect =
      option === questions[currentQuestion].correct_option;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore(score + 1);
      correctAudioRef.current.play();
    } else {
      wrongAudioRef.current.play();
    }
    timerAudioRef.current.pause();

    setShowAnswer(true);

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/users/results`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: auth.id,
          questionId: questions[currentQuestion].id,
          isCorrect,
        }),
        credentials: "include",
      });
    } catch (err) {
      console.error("Erreur lors de la sauvegarde des résultats", err);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setShowAnswer(false);
      setCurrentQuestion(currentQuestion + 1);
      setTimer(10);
    }
    return timerAudioRef.current.pause();
  };

  const messageScore = () => {
    timerAudioRef.current.pause();
    if (score <= 5) {
      return "Beaucoup de choses sont à revoir...Il est grand temps de retourner à tes révisions!";
    }
    if (score >= 6 && score <= 9) {
      return "Quelques erreurs mais tu es sur la bonne voie. Encore quelques efforts et tu seras incollable";
    }
    if (score === 10) {
      return "Un sans-faute, félicitations...mais ce n'est pas non plus la peine de trop se la raconter, ne te relache pas si tu veux rester au sommet";
    }
    return null;
  };

  const getScoreImage = () => {
    timerAudioRef.current.pause();
    if (score <= 5) {
      return lowScore;
    }
    if (score >= 6 && score <= 9) {
      return correctScore;
    }
    if (score === 10) {
      return perfectScore;
    }
    return null;
  };

  if (!questions.length) return <div>Loading...</div>;

  return (
    <div className="quiz-container">
      {currentQuestion < questions.length ? (
        <div className="quiz-section">
          <div className="timer-part">
            <h2 className="count-question">
              Question {currentQuestion + 1}/{questions.length}
            </h2>
            <p className="timer"> {timer}s</p>
          </div>
          <div className="intitule-part">
            <h2 className="intitule">{questions[currentQuestion].intitule}</h2>
          </div>
          <div className="reponse-part">
            <div className="quiz-part">
              {questions[currentQuestion].option1 && (
                <button
                  className="quiz-button"
                  type="button"
                  style={{
                    color: !showAnswer
                      ? "black"
                      : questions[currentQuestion].correct_option === 1
                        ? "rgb(11 139 11)"
                        : "rgb(215 14 32)",
                  }}
                  onClick={() => handleAnswer(1)}
                >
                  {questions[currentQuestion].option1}
                </button>
              )}
            </div>
            <div className="quiz-part">
              {questions[currentQuestion].option2 && (
                <button
                  className="quiz-button"
                  type="button"
                  style={{
                    color: !showAnswer
                      ? "black"
                      : questions[currentQuestion].correct_option === 2
                        ? "rgb(11 139 11)"
                        : "rgb(215 14 32)",
                  }}
                  onClick={() => handleAnswer(2)}
                >
                  {questions[currentQuestion].option2}
                </button>
              )}
            </div>
            <div className="quiz-part">
              {questions[currentQuestion].option3 && (
                <button
                  className="quiz-button"
                  type="button"
                  style={{
                    color: !showAnswer
                      ? "black"
                      : questions[currentQuestion].correct_option === 3
                        ? "rgb(11 139 11)"
                        : "rgb(215 14 32)",
                  }}
                  onClick={() => handleAnswer(3)}
                >
                  {questions[currentQuestion].option3}
                </button>
              )}
            </div>
            <div className="quiz-part">
              {questions[currentQuestion].option4 && (
                <button
                  className="quiz-button"
                  type="button"
                  style={{
                    color: !showAnswer
                      ? "black"
                      : questions[currentQuestion].correct_option === 4
                        ? "rgb(11 139 11)"
                        : "rgb(215 14 32)",
                  }}
                  onClick={() => handleAnswer(4)}
                >
                  {questions[currentQuestion].option4}
                </button>
              )}
            </div>
          </div>
          <button
            className="next-question"
            type="button"
            onClick={handleNext}
            disabled={timer > 0}
          >
            Question suivante
          </button>
        </div>
      ) : (
        <div className="score-container">
          <div className="score-img-container">
            <img
              className="score-img"
              src={getScoreImage()}
              alt="illustration en fonction du score"
            />
            <h2 style={{ textAlign: "center", padding: "2rem" }}>
              Quiz terminé !
            </h2>
            <p style={{ textAlign: "center", fontSize: "2rem" }}>
              Votre score : {score}/{questions.length}
            </p>
            <p style={{ textAlign: "center", fontSize: "1.8rem" }}>
              {messageScore()}
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button type="button" onClick={() => navigate("/quizlist")}>
                Retour aux quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
