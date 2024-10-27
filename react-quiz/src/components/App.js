import Main from "./Main";
import Error from "./Error";
import Loader from "./Loader";
import Header from "./Header";
import Questions from "./Question";
import StartScreen from "./StartScreen";
import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  status: "", // 'loading', 'ready', 'error', 'active', 'finished'
  currIdx: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "loadingStarted":
      return { ...state, status: "loading" };
    case "dataLoaded":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataLoadingFailed":
      return { ...state, questions: [], status: "error" };
    case "startQuiz":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions[state.currIdx];
      const isCorrect = question.correctOption === action.payload;
      return {
        ...state,
        answer: action.payload,
        points: state.points + (isCorrect ? question.points : 0),
      };
    case "nextQuestion":
      return { ...state, currIdx: state.currIdx + 1, answer: null };
    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, currIdx, answer } = state;
  const numQuestions = questions.length;

  useEffect(() => {
    dispatch({ type: "loadingStarted" });

    fetch(`http://localhost:9000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataLoaded", payload: data }))
      .catch((err) => dispatch({ type: "dataLoadingFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Questions
              question={questions[currIdx]}
              dispatch={dispatch}
              answer={answer}
            />
            {answer !== null ? (
              <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "nextQuestion" })}
              >
                Next
              </button>
            ) : null}
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
