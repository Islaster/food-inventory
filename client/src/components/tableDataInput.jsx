export default function TableDataInput({ index, cell, data, setData }) {
  const keyes = ["idItem", "name", "type", "Quantity", "price", "location"];
  return (
    <div className={`cell ${index}`} key={index}>
      <input
        type={typeof cell === "string" ? "text" : "number"}
        name={keyes[index] === "item #" ? "idItem" : keyes[index]}
        defaultValue={cell}
        onChange={(evt) =>
          setData({ ...data, [evt.target.name]: evt.target.value })
        }
      />
    </div>
  );
}
