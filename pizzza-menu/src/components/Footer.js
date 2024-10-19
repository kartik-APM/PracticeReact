function Footer() {
  const hour = new Date().getHours();
  const openHour = 10;
  const closeHour = 22;
  const isOpen = (hour) => openHour <= hour && hour <= closeHour;

  return (
    <footer className="footer">
      {isOpen(hour) ? (
        <div className="order">
          <p>We're open until {closeHour}:00.</p>
          <button className="btn">Order Now</button>
        </div>
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00
        </p>
      )}
    </footer>
  );
}

export default Footer;
