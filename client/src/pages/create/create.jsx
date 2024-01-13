import { useState } from "react";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
  const navi = useNavigate();
  const [data, setData] = useState({
    itemNo: 0,
    name: "",
    type: "",
    quantity: 0,
    amount: 0,
    location: "",
    date: `${
      new Date().getMonth() + 1
    }/${new Date().getDate()}/${new Date().getFullYear()}`,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const array = Object.keys(data).map((value) => data[value]);
    setData(data);
    axios
      .post("http://localhost:3001/create", array)
      .catch((error) => console.error("Error:", error));
    navi("/");
  }
  return (
    <form action="" onSubmit={handleSubmit} className="professional-form">
      <div className="form-group">
        <label htmlFor="itemNo">Item No.</label>
        <input
          type="number"
          name="itemNo"
          id="itemNo"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="type">Type</label>
        <input type="text" name="type" id="type" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="dept">Amount</label>
        <input
          type="number"
          name="amount"
          id="amount"
          step={0.01}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="space">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
}
