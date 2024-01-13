import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import TR from "../../components/tr";
import { Link } from "react-router-dom";
import { RiAddFill } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Inventory() {
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
  document.title = `Inventory`;

  useEffect(() => {
    axios("http://localhost:3001/inventory")
      .then((response) => setData(response.data.values))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const sortItems = (columnIndex, direction) => {
    const sortedData = [...data].sort((a, b) => {
      let itemA = a[columnIndex];
      let itemB = b[columnIndex];

      // Specific logic for the column with floating ints (assuming it's index 3)
      if (columnIndex === 3) {
        itemA = parseFloat(itemA.replace(/[^0-9.-]/g, ""));
        itemB = parseFloat(itemB.replace(/[^0-9.-]/g, ""));
      } else if (!isNaN(itemA) && !isNaN(itemB)) {
        // General numeric sorting for other columns
        itemA = parseFloat(itemA);
        itemB = parseFloat(itemB);
      } else {
        // String sorting for non-numeric columns
        return itemA.localeCompare(itemB);
      }

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

  return (
    <div>
      <Link to="/create">
        <button className="addButton">
          Add <RiAddFill />
        </button>
      </Link>
      <div className="table">
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
        {data.map((item, index) => (
          <TR item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
