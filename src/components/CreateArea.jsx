import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import programmingQuestions from "./data.json"; // Adjust the path

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  // When editNote changes, update the local note state
  useEffect(() => {
    if (props.editNote) {
      setNote({
        title: props.editNote.title,
        content: props.editNote.content
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
    setExpanded(false); // Collapse the form after submission
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        
          <input onClick={expand}
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
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
