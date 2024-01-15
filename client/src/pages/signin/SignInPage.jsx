import React, { useState } from "react";
import "./styles.css"; // Create this CSS file for styling

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the sign-in logic (e.g., API call)
  };

  return (
    <div className="signin-container">
      <div className="signin-form">
        <h1>Sign In</h1>
        <button className="google-signin-btn">Sign In with Google</button>
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
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="signin-btn" onClick={handleSubmit}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
