import "./styles.css";
import TD from "./tableData";
import TDInput from "./tableDataInput";
import { useState } from "react";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

export default function TableRow({ item, index }) {
  const [edit, setEdit] = useState(false);
  const [rowIndex, setRowIndex] = useState(index);
  const [data, setData] = useState({
    idItem: item.idItem,
    name: item.name,
    type: item.type,
    Quantity: item.Quantity,
    price: item.price,
    location: item.location,
    index: rowIndex,
    date: `${
      new Date().getMonth() + 1
    }/${new Date().getDate()}/${new Date().getFullYear()}`,
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    axios
      .post("http://localhost:3001/update", data)
      .then(data=>console.log(data))
      .catch((error) => console.error("Error:", error));
    setEdit(!edit);
  }
  console.log(item)
  return (
    <form className={`row ${index}`} key={index} onSubmit={handleSubmit}>
      {item.map((cell, cIndex) =>
        edit && `row ${rowIndex}` === `row ${index}` ? (
          <TDInput cell={cell} index={cIndex} data={data} setData={setData} />
        ) : (
          <TD cell={cell} index={cIndex} />
        )
      )}
      <>
        <div className="cell">
          { !edit?
            <MdEdit
            onClick={(event) => {
              setEdit(!edit);
              setRowIndex(index);
            }}
            />:
            <>
            <button className="editButton" type="submit">edit</button>
            <button className="cancelButton" onClick={() => setEdit(!edit)}>cancel</button>
            </>
          }
        </div>
        <div
          className="cell"
          onClick={() => {
            axios.post("http://localhost:3001/delete", {
              index,
            });
            window.location.reload();
          }}
        >
          <MdDeleteForever />
        </div>
      </>
    </form>
  );
}
