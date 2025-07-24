import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const initialTime = 23 * 60 * 60; // 23 hours in seconds
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return initialTime; // restart countdown
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}h : ${m
      .toString()
      .padStart(2, "0")}m : ${s.toString().padStart(2, "0")}s`;
  };

  return (
    <div className="time-left text-danger fw-bold">
      ⏳ {formatTime(timeLeft)} left at this price!
    </div>
  );
};

export default CountdownTimer;
