import React, { useState, useEffect } from "react";
import "./styles.css"; // Ensure this file is in the same directory
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const SignUpPage = ({ navi }) => {
  const { handleGoogle, loading, error } = useFetch(
    "http://localhost:3001/signup"
  );
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    userName: "",
  });
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailMatch = signupData.email === confirmEmail;
  const isPasswordMatch = signupData.password === confirmPassword;
  const isFormValid =
    emailRegex.test(signupData.email) && isEmailMatch && isPasswordMatch;

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
        // type: "standard",
        theme: "filled_white",
        size: "large",
        text: "continue_with",
        shape: "pill",
      });

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  const handleCloseError = () => {
    setSubmitted(false); // Hide the error popup
    setErrorMessage(""); // Clear the error message
  };

  const handleSubmit = (e) => {
    console.log(signupData);
    e.preventDefault();
    setSubmitted(true);

    if (!isFormValid) {
      let message = "Please check the following: ";
      if (!emailRegex.test(signupData.email))
        message += "Email format is incorrect. ";
      if (!isEmailMatch) message += "Emails do not match. ";
      if (!isPasswordMatch) message += "Passwords do not match. ";
      setErrorMessage(message);
    } else {
      setErrorMessage("");
      //login functionality
      axios.post("http://localhost:3001/user/create", signupData);
    }
    navi("/inventory");
  };
  return (
    <div className="signup-container">
      {submitted && !isFormValid && (
        <div className="error-popup">
          {errorMessage}
          <button className="close-error" onClick={handleCloseError}>
            &times;
          </button>
        </div>
      )}
      <div className="signup-form">
        <h1>Sign Up</h1>
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div id="signUpDiv" data-text="signup_with"></div>
        )}

        <div className="divider">
          <span>or</span>
        </div>
        <form action="">
          <input
            name="fullName"
            type="text"
            placeholder="Full Name (e.q. John Doe)"
            value={signupData.fullName}
            onChange={(evt) =>
              setSignupData({
                ...signupData,
                [evt.target.name]: evt.target.value,
              })
            }
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={signupData.email}
            onChange={(evt) =>
              setSignupData({
                ...signupData,
                [evt.target.name]: evt.target.value,
              })
            }
          />
          <input
            type="email"
            placeholder="Confirm Email Address"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            style={{
              boxShadow: submitted && !isEmailMatch ? "0 0 5px red" : "none",
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            value={signupData.password}
            onChange={(evt) =>
              setSignupData({
                ...signupData,
                [evt.target.name]: evt.target.value,
              })
            }
          />
          <input
            autoComplete="new-password"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              boxShadow: submitted && !isPasswordMatch ? "0 0 5px red" : "none",
            }}
          />

          <button className="signup-btn" onClick={handleSubmit}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
