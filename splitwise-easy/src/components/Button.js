function Button({ onClick, btnStyle, children }) {
  return (
    <button className={btnStyle} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
