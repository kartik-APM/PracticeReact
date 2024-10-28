import { useEffect } from "react";

function Timer({ secondsRemianing, dispatch }) {
  const mins = Math.floor(secondsRemianing / 60);
  const sec = secondsRemianing % 60;

  useEffect(() => {
    let timerId;
    timerId = setInterval(() => {
      if (secondsRemianing === 0) dispatch({ type: "quizFinished" });
      else dispatch({ type: "decrementTimer" });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [secondsRemianing, dispatch]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{sec < 10 && "0"}
      {sec}
    </div>
  );
}

export default Timer;
