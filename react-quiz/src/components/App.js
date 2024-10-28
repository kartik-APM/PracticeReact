import Main from "./Main";
import Error from "./Error";
import Header from "./Header";
import Loader from "./Loader";
import Footer from "./Footer";
import Progress from "./Progress";
import Questions from "./Question";
import StartScreen from "./StartScreen";
import { useEffect, useReducer } from "react";
import FinishedScreen from "./FinishedScreen";

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  status: "", // 'loading', 'ready', 'error', 'active', 'finished'
  currIdx: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemianing: null,
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
      return {
        ...state,
        status: "active",
        secondsRemianing: state.questions.length * SECS_PER_QUESTION,
      };

    case "decrementTimer":
      return { ...state, secondsRemianing: state.secondsRemianing - 1 };

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

    case "quizFinished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restartQuiz":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };
    /*
    Can be done in this way as well!
  return {
    ...state,
    status: "ready",
    currIdx: 0,
    answer: null,
    points: 0,
  };
  */
    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    currIdx,
    answer,
    points,
    highscore,
    secondsRemianing,
  } = state;
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, val) => acc + val.points, 0);

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
            <Progress
              currQuestionIndex={currIdx + 1}
              numQuestions={numQuestions}
              currPoints={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Questions
              question={questions[currIdx]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer
              answer={answer}
              currIdx={currIdx}
              dispatch={dispatch}
              numQuestions={numQuestions}
              secondsRemianing={secondsRemianing}
            />
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            currPoints={points}
            totalPoints={totalPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
