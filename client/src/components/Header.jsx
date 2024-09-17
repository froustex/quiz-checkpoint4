import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/images/logo.jpg";
import "../styles/header.css";
import { useAuth } from "../services/useAuth";
import Results from "./Results";
import AddQuestion from "./AddQuestion";
import Rate from "./Rate";

function Header() {
  const { auth, setAuth } = useAuth();
  const [showActions, setShowActions] = useState(false);
  const [showModalResults, setShowModalResults] = useState(false);
  const [showModalRate, setShowModalRate] = useState(false);
  const [showModalAddQuestion, setShowModalAddQuestion] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    setAuth();
    localStorage.clear();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Erreur de deconnexion");
      }
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleShowMenu = () => {
    setShowActions(!showActions);
  };

  const handleShowModalResults = () => {
    setShowModalResults(!showModalResults);
    setShowModalAddQuestion(false);
    setShowModalRate(false);
  };

  const handleShowModalAddQuestion = () => {
    setShowModalAddQuestion(!showModalAddQuestion);
    setShowModalRate(false);
    setShowModalResults(false);
  };

  const handleShowModalRate = () => {
    setShowModalRate(!showModalRate);
    setShowModalAddQuestion(false);
    setShowModalResults(false);
  };

  return (
    <>
      <header className="regular-header">
        <Link to="/">
          <img className="logo" src={logo} alt="CodeQuiz logo" />
        </Link>
        <div className="title-container">
          <p className="title">CODEQUIZ</p>
        </div>
        {auth ? (
          <div className="user-part" onMouseEnter={handleShowMenu}>
            <div className="user">{auth.username}</div>
          </div>
        ) : (
          <div className="user-part">
            <div className="user">Bienvenue</div>
          </div>
        )}
      </header>{" "}
      {auth && !auth.isAdmin ? (
        <div
          className={
            showActions
              ? `actions-container-visible`
              : `actions-container-hidden`
          }
        >
          <button type="button" onClick={handleLogout}>
            deconnexion
          </button>
          <button type="button" onClick={handleShowModalResults}>
            mes résultats
          </button>
          <button type="button" onClick={handleShowModalAddQuestion}>
            "Ajouter une question"
          </button>
          <button type="button" onClick={handleShowModalRate}>
            "Noter le jeu"
          </button>
        </div>
      ) : (
        ""
      )}
      <div
        className={
          showActions && showModalResults
            ? `results-container-visible`
            : `results-container-hidden`
        }
      >
        {auth.isAdmin ? "" : <Results auth={auth} />}
      </div>
      <div
        className={
          showActions && showModalAddQuestion
            ? `add-question-container-visible`
            : `add-question-container-hidden`
        }
      >
        {auth.isAdmin ? "" : <AddQuestion auth={auth} />}
      </div>
      <div
        className={
          showActions && showModalRate
            ? `rate-container-visible`
            : `rate-container-hidden`
        }
      >
        {auth.isAdmin ? "" : <Rate auth={auth} stars={5} />}
      </div>
    </>
  );
}

export default Header;
