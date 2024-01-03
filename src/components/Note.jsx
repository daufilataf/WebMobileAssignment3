import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  function handleEditClick() {
    props.onEdit(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
      <button onClick={handleEditClick}>
        <EditIcon />
      </button>
    </div>
  );
}

export default Note;
