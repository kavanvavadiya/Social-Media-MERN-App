import { useContext, useEffect, useRef, useState } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message before login attempt
    await loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  // Use useEffect to update errorMessage when error state changes
  useEffect(() => {
    if (error) {
      setErrorMessage(typeof error === "string" ? error : "Login failed. Please try again.");
    }
  }, [error]);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocialBook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on SocialBook.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            {/* Error Message Display */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="success" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <button
              className="loginRegisterButton"
              onClick={() => navigate("/register")}
              disabled={isFetching}
            >
              {isFetching ? (
                <CircularProgress color="success" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
