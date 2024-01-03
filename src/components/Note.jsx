import React, { useState } from "react";

function Note(props) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

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
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 24h to 12h format

    return `${day}.${month}.${year} ${formattedHours}:${minutes} ${ampm}`;
  }

  return (
    <div className="note">
      <div onClick={handleCardClick}>
        <h1>{props.title}</h1>
        {isAnswerVisible && <p>{props.content}</p>}
      </div>
      <div className="note-footer">
        <p>Status: {props.status}</p>
        <p>Last Modified: {props.lastModified}</p>
        <button onClick={handleEdit}>
          <i className="fas fa-edit"></i> 
        </button>
        <button onClick={handleDelete}>
          <i className="fas fa-trash-alt"></i> 
        </button>
      </div>
    </div>
  );
}

export default Note;

