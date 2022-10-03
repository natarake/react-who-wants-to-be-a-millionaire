import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";

export default function Questions({
  data,
  setStopGame,
  questionNumber,
  setQuestionNumber,
}) {
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [className, setClassName] = useState("option");
  const [letsPlay] = useSound(play);
  const [correctOption] = useSound(correct);
  const [wrongOption] = useSound(wrong);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (option) => {
    setSelectedOption(option);
    setClassName("option active");
    delay(3000, () => {
      setClassName(option.correct ? "option correct" : "option wrong");
    });
    delay(5000, () => {
      if (option.correct) {
        correctOption();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedOption(null);
        });
      } else {
        wrongOption ();
        delay(1000, () => {
          setStopGame(true);
        });
      }
    });
  };
  return (
    <div className="questionContainer">
      <div className="questions">{question?.question}</div>
      <div className="options">
        {question?.options.map((option) => (
          <div
            className={selectedOption === option ? className : "option"}
            onClick={() => handleClick(option)}
          >
            {option.text}
          </div>
        ))}
      </div>
    </div>
  );
}
