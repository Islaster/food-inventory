import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import TableRow from "../../components/tableRow";
import { Link } from "react-router-dom";
import { RiAddFill } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SearchBar from "../../components/searchbar";

export default function Inventory() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
  document.title = `Inventory`;

  useEffect(() => {
    axios("http://localhost:3001/inventory")
      .then((response) => {
        setData(response.data.values);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filteredData = searchTerm
    ? data.filter((row) =>
        row.some((cell) =>
          cell.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;

  const sortItems = (columnIndex, direction) => {
    const sortedData = [...data].sort((a, b) => {
      let itemA = a[columnIndex];
      let itemB = b[columnIndex];

      // Custom date parsing and sorting for the 7th column (index 6)
      if (columnIndex === 6) {
        itemA = parseDate(itemA);
        itemB = parseDate(itemB);
      } else if (columnIndex === 4) {
        // Logic for 5th column with currency values
        itemA = parseInt(itemA.replace(/[$.]/g, ""), 10);
        itemB = parseInt(itemB.replace(/[$.]/g, ""), 10);
      } else if (!isNaN(itemA) && !isNaN(itemB)) {
        // Numeric sorting for other numeric columns
        itemA = parseFloat(itemA);
        itemB = parseFloat(itemB);
      } else if (typeof itemA === "string" && typeof itemB === "string") {
        // String sorting for non-numeric columns
        return direction === "ascending"
          ? itemA.localeCompare(itemB)
          : itemB.localeCompare(itemA);
      }

      // Sorting logic
      if (itemA < itemB) {
        return direction === "ascending" ? -1 : 1;
      }
      if (itemA > itemB) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
  };

  // Custom function to parse dates in mm/dd/yyyy format
  function parseDate(dateString) {
    const parts = dateString.split("/");
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10) - 1; // JS months are 0-indexed
    const year = parseInt(parts[2], 10);

    return new Date(year, month, day);
  }

  return (
    <div>
      <Link to="/create">
        <button className="addButton">
          Add <RiAddFill />
        </button>
      </Link>
      <SearchBar
        placeholder="Search Inventory..."
        onSearchChange={handleSearchChange}
      />
      <div className="table" key={"table 1"}>
        <div className="header-row row">
          {headers.map((header, index) =>
            index > headers.length - 3 ? (
              <div className="cell">{header}</div>
            ) : (
              <div className="cell">
                {header}{" "}
                <IoIosArrowUp onClick={() => sortItems(index, "ascending")} />{" "}
                <IoIosArrowDown
                  onClick={() => sortItems(index, "descending")}
                />
              </div>
            )
          )}
        </div>
        {filteredData.map((item, index) => (
          <TableRow key={`row-${index}`} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
