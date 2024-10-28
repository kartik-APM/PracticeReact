function Progress({
  currQuestionIndex,
  numQuestions,
  currPoints,
  totalPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={answer ? currQuestionIndex : currQuestionIndex - 1}
      />
      <p>
        {" "}
        Question <strong>{currQuestionIndex}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{currPoints}</strong>/{totalPoints}
      </p>
    </header>
  );
}

export default Progress;
