function Pizza(props) {
  const { name, ingredients, photoName, price, soldOut } = props;

  return (
    <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldOut ? "SOLD OUT" : `Price: ${price}`}</span>
      </div>
    </li>
  );
}

export default Pizza;
