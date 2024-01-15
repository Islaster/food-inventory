import React, { useState } from "react";
import "./styles.css"; // Ensure this file is in the same directory

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailMatch = email === confirmEmail;
  const isPasswordMatch = password === confirmPassword;
  const isFormValid = emailRegex.test(email) && isEmailMatch && isPasswordMatch;

  const handleCloseError = () => {
    setSubmitted(false); // Hide the error popup
    setErrorMessage(""); // Clear the error message
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!isFormValid) {
      let message = "Please check the following: ";
      if (!emailRegex.test(email)) message += "Email format is incorrect. ";
      if (!isEmailMatch) message += "Emails do not match. ";
      if (!isPasswordMatch) message += "Passwords do not match. ";
      setErrorMessage(message);
    } else {
      setErrorMessage("");
      // Here, you can add logic to handle the valid form submission, like an API call.
    }
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
        <button className="google-signup-btn">Sign Up with Google</button>

        <div className="divider">
          <span>or</span>
        </div>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
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
      </div>
    </div>
  );
};

export default SignUpPage;
