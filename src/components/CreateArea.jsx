import React, { useState, useEffect } from "react";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
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
    props.onAdd(note);
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
          <button onClick={submitNote}>
            Add
          </button>
        )}
      </form>
    </div>
  );
}

export default CreateArea;
