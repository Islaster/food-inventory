export default function TD({ cell, index }) {
  return (
    <div className="cell" style={{ border: "1px solid grey" }} key={index}>
      {" "}
      {cell}{" "}
    </div>
  );
}
