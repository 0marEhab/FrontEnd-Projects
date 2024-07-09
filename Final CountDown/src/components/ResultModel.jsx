import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";


const ResultModel = forwardRef( function ResultModel({ result, targetTime, timeRemaining, onReset },ref) {
  const dialog = useRef()
  const formatedTime = (timeRemaining/1000).toFixed(2)
  const userLost = (timeRemaining <=0)
  const score = Math.round((1 - timeRemaining / (targetTime *1000))*100)
  useImperativeHandle(ref,()=>{
    return {
      open(){
        dialog.current.showModal()
      }
    }
  })  
  return createPortal(

         
      <dialog ref={dialog} className="result-modal" >
        {userLost && <h2>you lost</h2>}
        {!userLost && <h2>your score is: {score}</h2>}
        <p>
          the target time was <strong>{targetTime} seconds .</strong>
        </p>
        <p>
          You stopped the timer with <strong>{formatedTime} second left.</strong>
        </p>
        <form method="dialog" onSubmit={onReset}>
          <button>Close</button>
        </form>
      </dialog>
    ,document.getElementById("modal")
  );
})
export default ResultModel;
