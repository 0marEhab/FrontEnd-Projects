import { useState } from "react";

export default function player({ name, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [initialName, setInitialName] = useState(name);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, initialName);
    }
  }
  function handleChange(event) {
    setInitialName(event.target.value);
  }
  let playerName = <span className="player-name">{initialName}</span>;
  if (isEditing) {
    playerName = (
      <input type="text" required value={initialName} onChange={handleChange} />
    );
  }
  return (
    <li className={isActive ? "active" : "undefined"}>
      <span className="player">{playerName}</span>
      <span className="player-symbol">{symbol}</span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
