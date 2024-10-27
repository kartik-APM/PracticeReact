function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, idx) => {
        return (
          <button
            key={option}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: idx })}
            className={`btn btn-option ${idx === answer ? "answer" : ""} ${
              hasAnswered
                ? idx === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
