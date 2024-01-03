import React, { useState } from "react";

function Note(props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  function handleFlip() {
    setIsFlipped(!isFlipped);
  }
  function handleCardClick() {
    setIsAnswerVisible(!isAnswerVisible);
  }

  function handleDelete() {
    props.onDelete(props.id);
  }

  function handleEdit() {
    props.onEdit(props.id);
  }

  function formatDate(isoString) {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}:${month}:${year} ${hours}:${minutes}`;
  }

  const formattedDate = formatDate(props.lastModified); // Format the lastModified date
  return (
    <div onClick={handleCardClick} className={`note ${isFlipped ? 'note-flipped' : ''}`}>
      <div className="note-inner">
        <div className="note-front">
          {/* Front side of the note */}
          <input type="checkbox" onChange={() => props.onSelectionToggle(props.id)} />
          <div>
            <h1>{props.title}</h1>
          </div>
          <div className="note-footer">
            <p>Status: {props.status}</p>
            <p>Last Modified: {formatDate(props.lastModified)}</p>
            <div>
              <button onClick={handleEdit}>
                <i className="fas fa-edit"></i>
              </button>
              <button onClick={handleDelete}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="note-back">
          {isAnswerVisible && <p>{props.content}</p>}
        </div>
      </div>
    </div>
  );
}
export default Note;