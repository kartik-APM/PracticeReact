import { useState } from "react";

function PackingList({ items, onToggleItem, onDeleteItem, onClearItems }) {
  const [sortBy, setSortBy] = useState("packed");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item, _) => {
          return (
            <li key={`${item.description} ${item.quantity}`}>
              <input
                type="checkbox"
                value={item.packed}
                onChange={() => onToggleItem(item.id)}
              />
              <span
                style={item.packed ? { textDecoration: "line-through" } : {}}
              >
                {item.quantity} {item.description}
              </span>
              <button onClick={() => onDeleteItem(item.id)}>❌</button>
            </li>
          );
        })}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value={"input"}>sort by input order</option>
          <option value={"description"}>sort by description</option>
          <option value={"packed"}>sort by packed status</option>
        </select>
        <button onClick={onClearItems}>clear list</button>
      </div>
    </div>
  );
}

export default PackingList;
