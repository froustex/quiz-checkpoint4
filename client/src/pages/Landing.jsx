import { Link } from "react-router-dom";
import landing from "../assets/images/landing.jpg";
import "../styles/landing.css";

function Landing() {
  return (
    <main className="landing-container">
      <div className="landingImg-container">
        <img
          className="accueilImg"
          src={landing}
          alt="illustration de la page d'accueil"
        />
      </div>
      <p className="accueil-p">Vous n'avez pas encore de compte?</p>
      <div className="buttons-container">
        <div>
          <Link to="/register">
            <button className="button-accueil" type="button">
              S'enregistrer
            </button>
          </Link>
        </div>
        <div>
          <Link to="/login">
            <button className="button-accueil" type="button">
              Se connecter
            </button>
          </Link>
        </div>
      </div>
      <p>ou</p>
      <div>
        <Link to="/quiztest">
          <button className="button-accueil-quiz" type="button">
            accéder au Quiz Test
          </button>
        </Link>
      </div>
    </main>
  );
}

export default Landing;
