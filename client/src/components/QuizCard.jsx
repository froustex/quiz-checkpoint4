import { Link } from "react-router-dom";

function QuizCard({ theme, difficulty }) {
  return (
    <div className="card-title">
      <h3>
        {theme} - {difficulty}
      </h3>
      <Link to={`/quiz/${theme}/${difficulty}`}>Commencer le Quiz</Link>
    </div>
  );
}

export default QuizCard;
