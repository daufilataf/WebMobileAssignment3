import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [status, setStatus] = useState("Noted");

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  useEffect(() => {
    if (props.editNote) {
      setNote({
        title: props.editNote.question, // Make sure these keys match
        content: props.editNote.answer   // the structure of your note
      });
      setExpanded(true);
    }
  }, [props.editNote]);

  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    if (!note.title || !note.content) {
      alert("Title and content cannot be empty.");
      return; // Do not add the note
    }
    props.onAdd(note, status);
    setNote({
      title: "",
      content: ""
    });
    setExpanded(false);
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }
  return (
    <div>
      <form className="create-note">
        <input
          onClick={expand}
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        {isExpanded && (
          <textarea
            name="content"
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows={isExpanded ? 3 : 1}
          />

          
        )}
        {isExpanded && (
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Learned">Learned</option>
          <option value="Want to Learn">Want to Learn</option>
          <option value="Noted">Noted</option>
        </select>
         )}
        {isExpanded && (
          <button onClick={submitNote}>
             <i className="fas fa-plus"></i> 
          </button>
        )}
      </form>
    </div>
  );
}

export default CreateArea;