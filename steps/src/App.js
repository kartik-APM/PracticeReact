import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  const [step, setStep] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const onCloseClick = () => {
    setIsOpen((val) => !val);
  };

  const handlePrevClick = () => {
    if (step === 0) return;
    setStep((prev) => prev - 1);
  };

  const handleNextClick = () => {
    if (step === 2) return;
    setStep((next) => next + 1);
  };

  return (
    <>
      <button className="close" onClick={onCloseClick}>
        &times;
      </button>
      {isOpen ? (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 0 ? "active" : ""}>1</div>
            <div className={step >= 1 ? "active" : ""}>2</div>
            <div className={step >= 2 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            Step {step + 1}: {messages[step]}
          </p>
          <div className="buttons">
            <button onClick={handlePrevClick}>Prev</button>
            <button onClick={handleNextClick}>Next</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;
