import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../services/useAuth";

function Rate({ stars }) {
  const { auth } = useAuth();
  const [rating] = useState();
  const [rate, setRate] = useState(rating);
  const [hover, setHover] = useState(0);

  async function refreshRate() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${auth.id}`,
        { credentials: "include" }
      );
      const newRate = await response.json();

      if (!response.ok) {
        throw new Error("Erreur lors du chargement de votre note");
      } else {
        return setRate(newRate.rate);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async function handleClick(e, getCurrentIndex) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/rate`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            rate: getCurrentIndex,
            id: auth.id,
          }),
          credentials: "include",
        }
      );
      if (response.status !== 201) {
        throw new Error("Erreur lors de votre notation");
      } else {
        setRate(getCurrentIndex);
      }
    } catch (err) {
      console.error(err);
    }
  }
  refreshRate();

  function handleMouseEnter(getCurrentIndex) {
    setHover(getCurrentIndex);
  }

  function handleMouseLeave() {
    setHover(rate);
  }

  useEffect(() => {}, [rate]);

  return (
    auth && (
      <div>
        {[...Array(stars)].map((_, index) => {
          const star = index + 1;

          return (
            <FontAwesomeIcon
              icon={faStar}
              key={star}
              className={
                star <= (hover || rating || rate)
                  ? `star-selected`
                  : `star-not-selected`
              }
              onClick={(e) => handleClick(e, star)}
              onMouseMove={() => handleMouseEnter(star)}
              onMouseLeave={() => handleMouseLeave()}
              size={40}
              value={rating}
            />
          );
        })}
      </div>
    )
  );
}

export default Rate;
