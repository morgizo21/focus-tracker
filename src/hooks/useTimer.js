import { useState, useRef, useEffect } from "react";

function useTimer(onComplete){
  const [secondsLeft, setSecondsLeft] = useState(25*60);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  // Clean up the timer interval if the component is removed
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    }
  }, [])

  function start(){
    if(isRunning || secondsLeft === 0){
      return;
    }

    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setSecondsLeft((previousSeconds) => {
        if (previousSeconds === 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);       

          onComplete();

          return 0;
        }

        return previousSeconds - 1;
      });
    }, 1000);
  }

  function pause(){
    clearInterval(intervalRef.current);
    setIsRunning(false)
  }

  function reset(){
    clearInterval(intervalRef.current);
    setSecondsLeft(25*60);
    setIsRunning(false)
  }

  return {
    secondsLeft,
    isRunning,
    start,
    pause,
    reset
  };
}


export default useTimer;