import { useRef, useState } from "react";
import ResultModel from "./ResultModel";

export default function TimeChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  
  const [timeRemaining,setTimeRemaining] = useState(targetTime * 1000)

  let timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000

  if(timeRemaining <= 0 ){
    clearInterval(timer.current)
   
    dialog.current.open()
  }
  function onReset(){
    setTimeRemaining(targetTime*1000)
  }

  function handleTime() {
    timer.current = setInterval(() => {
      setTimeRemaining(prevTime=>
        prevTime - 10
      )
    }, 10);  
  }
  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open()
  }

  return (
    <>
      <ResultModel ref={dialog} targetTime={targetTime} timeRemaining={timeRemaining} onReset={onReset} />
      <section className="challenge">
        <h2>{title}</h2>
        
        <p className="challenge-time">
          {targetTime} second {targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleTime}>
            {timerIsActive ? "Stop timer " : "Start Challenge"}
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "time is running" : "timer inactive"}
        </p>
      </section>
    </>
  );
}
