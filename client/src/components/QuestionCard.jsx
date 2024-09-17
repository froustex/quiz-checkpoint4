import "../styles/questionsList.css";

function QuestionCard({ question }) {
  return (
    <div className="question-card">
      <li key={question.id}>
        <strong>{question.intitule}</strong>
        <p>{`Options: ${question.option1}, ${question.option2}, ${question.option3}, ${question.option4}`}</p>
      </li>
    </div>
  );
}

export default QuestionCard;
