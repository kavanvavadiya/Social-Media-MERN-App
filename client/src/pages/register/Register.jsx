import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleClick = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message before new request

    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
        // Set error message from backend response
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
      }
    }
  };

  // Reset validation message when user types
  const handleInputChange = (ref) => {
    ref.current.setCustomValidity("");
    setErrorMessage(""); // Clear error when user starts typing
  };

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
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
              onChange={() => handleInputChange(username)}
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
              onChange={() => handleInputChange(email)}
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
              onChange={() => handleInputChange(passwordAgain)}
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button
              className="loginRegisterButton"
              onClick={() => {
                navigate("/login");
              }}
            >
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
