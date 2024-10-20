function Stats({ items }) {
  const totalItems = items.length;
  if (!totalItems)
    return (
      <div className="stats">
        <p>Start adding some items to your packing list 🚀</p>
      </div>
    );

  const completedItems = items.reduce((count, item) => {
    if (item.packed) count++;
    return count;
  }, 0);
  return (
    <div className="stats">
      {completedItems === totalItems ? (
        <p>"You got everything! Ready to go ✈️"</p>
      ) : (
        <p>
          {" "}
          💼 You have {totalItems} items on your list, and you already packed{" "}
          {completedItems} items.
        </p>
      )}
    </div>
  );
}

export default Stats;
