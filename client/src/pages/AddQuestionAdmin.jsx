import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/addQuestionAdmin.css";
import { useAuth } from "../services/useAuth";

function AddQuestionAdmin() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    intitule: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctOption: "",
    difficulty: "",
    theme: "",
    isValid: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/add`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        },
        { credentials: "include" }
      );
      const result = await response.json();
      if (response.ok) {
        console.info("Question créee", result.insertId);
        setFormData(formData);
        navigate(0);
      } else {
        throw new Error(
          "Erreur pendant la création de votre question",
          result.message
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    auth.isAdmin && (
      <form className="admin-question-form" onSubmit={handleSubmit}>
        <input
          className="intitule"
          type="text"
          name="intitule"
          placeholder="Intitulé"
          value={formData.intitule}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="option1"
          placeholder="Option 1"
          value={formData.option1}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="option2"
          placeholder="Option 2"
          value={formData.option2}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="option3"
          placeholder="Option 3"
          value={formData.option3}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="option4"
          placeholder="Option 4"
          value={formData.option4}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="correctOption"
          placeholder="Option Correcte (1-4)"
          value={formData.correctOption}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="difficulty"
          placeholder="Difficulté"
          value={formData.difficulty}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="theme"
          placeholder="Theme"
          value={formData.theme}
          onChange={handleChange}
          required
        />
        <button type="submit">Ajouter la question</button>
      </form>
    )
  );
}

export default AddQuestionAdmin;
