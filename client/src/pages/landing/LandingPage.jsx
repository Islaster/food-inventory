import React from "react";
import "./styles.css"; // Make sure to create this CSS file
import TableRow from "../../components/tableRow";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [data, setData] = useState([]);
  const headers = [
    "Product #",
    "Product name",
    "type",
    "Quantity",
    "amount",
    "location",
    "date",
    "Edit",
    "Delete",
  ];

  useEffect(() => {
    axios("http://localhost:3001/inventory")
      .then((response) => setData(response.data.values))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div className="container">
      <div className="blur-background">
        <div className="table">
          <div className="header-row row">
            {headers.map((header, index) =>
              index > headers.length - 3 ? (
                <div className="cell">{header}</div>
              ) : (
                <div className="cell">{header} </div>
              )
            )}
          </div>
          {data.map((item, index) => (
            <TableRow item={item} index={index} />
          ))}
        </div>
      </div>
      <div className="auth-section">
        <p className="auth-message">
          Get a peek at our amazing inventory! Sign up or sign in now.
        </p>
        <div className="auth-buttons">
          <Link to="/signup">
            <button id="sign-up-btn">Sign Up</button>
          </Link>
          /
          <Link to="/signin">
            <button>Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
