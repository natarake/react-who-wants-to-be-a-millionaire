import { useEffect, useState } from "react";
import "./app.css";
import Questions from "./components/Questions";
import Timer from "./components/Timer";
import { data, prizes } from "./dummyData.js";
import Start from "./components/Start";

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stopGame, setStopGame] = useState(false);
  const [earned, setEarned] = useState("$0");

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(
        prizes.find((prizes) => prizes.id === questionNumber - 1).amount
      );
  }, [questionNumber]);

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {stopGame ? (
              <h1 className="endText">You earned: {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setStopGame={setStopGame}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Questions
                    data={data}
                    setStopGame={setStopGame}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {prizes.map((prizes) => (
                <li
                  className={
                    questionNumber === prizes.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{prizes.id}</span>
                  <span className="moneyListItemAmount">{prizes.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
