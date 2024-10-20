import { useState } from "react";

function Form(props) {
  const { onAddItem } = props;

  const [description, setDescription] = useState("");
  const [quantity, setQuanity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };

    onAddItem(newItem);
    setDescription("");
    setQuanity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>

      <select
        value={quantity}
        onChange={(e) => setQuanity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((val, idx) => (
          <option value={val} key={val}>
            {val}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={description}
        placeholder="Add your item..."
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
}

export default Form;
