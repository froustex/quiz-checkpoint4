import "../styles/login.css";
import { useEffect, useRef } from "react";
import {
  Link,
  Form,
  useNavigate,
  useActionData,
  useNavigation,
  useRouteError,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../services/useAuth";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    const data = await response.json();
    if (response.status === 422) {
      throw new Error(
        data?.message || "Une erreur est survenue pendant la connexion"
      );
    }
    const userData = {
      id: data?.user?.id,
      username: data?.user?.username,
      isAdmin: data?.user?.is_admin,
    };
    localStorage.setItem("username", JSON.stringify(userData));
    return userData;
  } catch (err) {
    throw new Error(err?.message);
  }
}

function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const actionData = useActionData();
  const error = useRouteError();
  const emailRef = useRef();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    if (actionData) {
      setAuth(actionData);
      if (!actionData.isAdmin) {
        navigate("/quizlist", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [actionData, setAuth, navigate]);

  return (
    <main>
      <section className="login-container">
        {error && (
          <p>
            <FontAwesomeIcon icon={faTriangleExclamation} />
            {error.message}
          </p>
        )}
        <Form className="login-form" method="POST">
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              className="formInput"
              name="email"
              type="email"
              id="email"
              ref={emailRef}
              autoComplete="off"
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="password">Mot de passe</label>
            <input
              className="formInput"
              name="password"
              type="password"
              id="password"
              required
            />
          </div>

          <button
            type="submit"
            className="isSubmitting"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Connexion en cours..." : "se connecter"}
          </button>
        </Form>
        <p>
          Pas encore de compte ? <Link to="/register">S'enregistrer</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
