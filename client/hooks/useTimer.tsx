/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

const useTimer = () => {
  const [counter, setCounter] = useState<any>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (counter === 0) return setIsRunning(false); 
    setTimeout(() => setCounter(counter - 1), 1000);
    if (!isRunning) setIsRunning(true);
  }, [counter])

  return [counter, setCounter, isRunning];
};

export default useTimer;
