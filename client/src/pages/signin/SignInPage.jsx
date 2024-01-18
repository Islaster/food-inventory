import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // Create this CSS file for styling
import useFetch from "../../hooks/useFetch";

const SignInPage = () => {
  const navi = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleGoogle, loading, error } = useFetch(
    "http://localhost:3001/signin"
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        ux_mode: "popup",
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("loginDiv"), {
        // type: "standard",
        theme: "filled_white",
        size: "large",
        text: "signin_with",
        shape: "pill",
      });
      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the sign-in logic (e.g., API call)
  };
  return (
    <div className="signin-container">
      {}
      <form action="">
        <div className="signin-form">
          <h1>Sign In</h1>
          {loading ? (
            <div>Loading....</div>
          ) : (
            <>
              <div id="loginDiv"></div>
            </>
          )}
          <div className="divider">
            <span>or</span>
          </div>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <button className="signin-btn" type="submit" onClick={handleSubmit}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
