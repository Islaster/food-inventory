import React from "react";
import "./styles.css"; // Make sure this path is correct

const SearchBar = ({ placeholder, onSearchChange }) => {
  return (
    <input
      type="text"
      className="searchBar"
      placeholder={placeholder}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};

export default SearchBar;
