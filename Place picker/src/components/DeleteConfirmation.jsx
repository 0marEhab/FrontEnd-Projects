import { useEffect, useState } from "react";

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  const Timer = 3000;
  const [remainingTime, setRemainingTime] = useState(Timer);
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, Timer);
    return () => clearTimeout(timer);
  }, [onConfirm]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <progress value={remainingTime} max={Timer} />
    </div>
  );
}
