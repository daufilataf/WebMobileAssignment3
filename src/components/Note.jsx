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
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}:${month}:${year} ${hours}:${minutes}`;
  }

  const formattedDate = formatDate(props.lastModified); // Format the lastModified date

  return (
    <div className="note">
      <div onClick={handleCardClick}>
        <h1>{props.title}</h1>
        {isAnswerVisible && <p>{props.content}</p>}
      </div>
      <div className="note-footer">
        <p>Status: {props.status}</p>
        <p>Last Modified: {formattedDate}</p> {/* Display the formatted date */}
        <button onClick={handleDelete}>
          <i className="fas fa-trash-alt"></i>
        </button>
        <button onClick={handleEdit}>
          <i className="fas fa-edit"></i>
        </button>
      </div>
    </div>
  );
}

export default Note;
