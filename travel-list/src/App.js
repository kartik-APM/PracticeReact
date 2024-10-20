import { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import Stats from "./components/Stats";
import PackingList from "./components/PackingList";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
];

function App() {
  const [items, setItems] = useState(initialItems);

  const handleAddItem = (newItem) => {
    setItems((elm) => [...elm, newItem]);
  };

  const handleToggleItem = (id) => {
    const newItems = items.map((item) => {
      return item.id === id ? { ...item, packed: !item.packed } : item;
    });
    setItems([...newItems]);
  };

  const handleDeleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems([...newItems]);
  };

  const handleClearItems = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to clear the list?"
    );
    if (confirmed) setItems([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onToggleItem={handleToggleItem}
        onDeleteItem={handleDeleteItem}
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
