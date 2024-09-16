import { useState, useEffect, useRef } from "react";
import "../styles/quizz.css";
import { useLoaderData } from "react-router-dom";

import timerSound from "../assets/sounds/timer.mp3";
import correctSound from "../assets/sounds/correct.wav";
import wrongSound from "../assets/sounds/wrong.wav";

export const loader = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/questions/test`,
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Erreur pendant le chargement des données", err);
    throw err;
  }
};

function QuizTest() {
  const questions = useLoaderData();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

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

  const handleAnswer = (option) => {
    setTimer(0);
    setSelectedOption(option);
    const correct = questions[currentQuestion].correct_option;
    if (option === correct) {
      setScore(score + 1);
      correctAudioRef.current.play();
      timerAudioRef.current.pause();
      wrongAudioRef.current.pause();
    } else {
      wrongAudioRef.current.play();
      timerAudioRef.current.pause();
      correctAudioRef.current.pause();
    }
    setShowAnswer(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setShowAnswer(false);
      setSelectedOption(null);
      setCurrentQuestion(currentQuestion + 1);
      setTimer(10);
    }
    return timerAudioRef.current.pause();
  };

  if (!questions.length) return <p>chargement...</p>;

  return (
    <div className="quiz-container">
      {currentQuestion < questions.length ? (
        <div className="quiz-section">
          <div className="timer-part">
            <h2 className="count-question">
              Question {currentQuestion + 1} / {questions.length}
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
        <div>
          <h2>Quiz terminé !</h2>
          <p>
            Votre score : {score}/{questions.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default QuizTest;
