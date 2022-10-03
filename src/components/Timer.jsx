import { useEffect, useState } from "react";

export default function Timer({ setStopGame, questionNumber }) {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) return setStopGame(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [setStopGame, timer]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);

  return timer;
}
