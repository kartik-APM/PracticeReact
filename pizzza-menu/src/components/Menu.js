import Pizza from "./Pizza";
import { pizzaData } from "../data";

function Menu() {
  const PIZZA = pizzaData;

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {PIZZA.length ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {PIZZA.map((pizza, index) => (
              <Pizza
                key={index}
                name={pizza.name}
                ingredients={pizza.ingredients}
                price={pizza.price}
                photoName={pizza.photoName}
                soldOut={pizza.soldOut}
              />
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working our menu. Please come back later</p>
      )}
    </main>
  );
}

export default Menu;
