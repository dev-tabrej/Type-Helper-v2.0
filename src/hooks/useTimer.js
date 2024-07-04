import { useEffect, useState } from "react";

const useTimer = (initialTime, start) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (start && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [start, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      setShowResults(true);
    }
  }, [timeLeft]);

  return { timeLeft, setTimeLeft, showResults };
};

export default useTimer;
