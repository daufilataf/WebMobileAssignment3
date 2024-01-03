import React from "react";

function Note(props) {
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
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <p>Last Modified: {formatDate(props.lastModified)}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}


export default Note;
