import Timer from "./Timer";

function Footer({ answer, currIdx, numQuestions, dispatch, secondsRemianing }) {
  return (
    <footer>
      <Timer secondsRemianing={secondsRemianing} dispatch={dispatch} />
      {answer !== null ? (
        currIdx < numQuestions - 1 ? (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "nextQuestion" })}
          >
            Next
          </button>
        ) : (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "quizFinished" })}
          >
            Finish
          </button>
        )
      ) : null}
    </footer>
  );
}

export default Footer;
