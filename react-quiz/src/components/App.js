import Main from "./Main";
import Error from "./Error";
import Header from "./Header";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  status: "", // 'loading', 'ready', 'error', 'active', 'finished'
  score: 0,
};

function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "loadingStarted":
      return { ...state, status: "loading" };
    case "dataLoaded":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataLoadingFailed":
      return { ...state, questions: [], status: "error" };
    case "startQuiz":
      return { ...state, status: "active" };
    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status } = state;
  const numQuestions = questions.length;

  useEffect(() => {
    dispatch({ type: "loadingStarted" });

    fetch(`http://localhost:9000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataLoaded", payload: data }))
      .catch((err) => dispatch({ type: "dataLoadingFailed" }));
  }, []);

  const handleStartQuiz = () => {
    dispatch({ type: "startQuiz" });
  };

  console.log(state);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            onStartQuiz={handleStartQuiz}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
