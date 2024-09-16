import "../styles/register.css";
import { useState, useRef, useEffect } from "react";
import {
  Link,
  Form,
  redirect,
  useNavigation,
  useRouteError,
} from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        isAdmin: false,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data?.message || "Une erreur est survenue pendant l'enregistrement"
      );
    }
    return redirect("/login");
  } catch (err) {
    throw new Error(err.message);
  }
}

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const error = useRouteError();

  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PASSWORD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("Veuillez remplir tous les champs en suivant les instructions");
  }, [user, email, pwd, matchPwd]);

  return (
    <main>
      <section>
        {error && (
          <p>
            <FontAwesomeIcon icon={faTriangleExclamation} />
            {error.message}
          </p>
        )}
        <p
          ref={errRef}
          className={
            user &&
            (!validName || !validEmail || !validPwd || (!validMatch && errMsg))
              ? "errmsg"
              : "hide"
          }
        >
          {errMsg}
        </p>
        <Form className="form-register" method="post">
          <div className="input-register">
            <label htmlFor="username">
              Nom d'utilisateur
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="formInput"
              type="text"
              id="username"
              name="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              className={
                userFocus && user && !validName ? "instructions" : "hide"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 à 24 caractères. <br />
              Doit commencer par une lettre. <br />
              Lettres, nombres, underscores, traits d'union autorisés.
            </p>
          </div>

          <div className="input-register">
            <label htmlFor="email">
              Email
              <span className={validEmail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !email ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="formInput"
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              className={
                emailFocus && email && !validEmail ? "instructions" : "hide"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Entrez une adresse mail valide
            </p>
          </div>

          <div className="input-register">
            <label htmlFor="password">
              Mot de passe
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="formInput"
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p className={pwdFocus && !validPwd ? "instructions" : "hide"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 à 24 caractères. <br />
              Doit inclure au minimum une minuscule, une majuscule, un nombre et
              un caractère spécial. <br />
              Caractères spéciaux autorisés: ! @ # $ %
            </p>
          </div>

          <div className="input-register">
            <label htmlFor="confirm_pwd">
              Confirmez le mot de passe
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="formInput"
              type="password"
              name="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p className={matchFocus && !validMatch ? "instructions" : "hide"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Doit correspondre au mot de passe
            </p>
          </div>
          <button
            type="submit"
            disabled={
              !validName ||
              !validEmail ||
              !validPwd ||
              !validMatch ||
              isSubmiting
            }
            className="isSubmiting"
          >
            {isSubmiting ? "En cours d'enregistrement..." : "s'enregistrer"}
          </button>
        </Form>
        <p className="login-redirection">
          Vous avez déjà un compte? <Link to="/login">Login</Link>
        </p>
      </section>
      <div />
    </main>
  );
}

export default Register;
