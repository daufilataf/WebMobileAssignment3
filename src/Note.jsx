import React from "react"
import ReactDOM from "react-dom"

function Note(props){
   
    return (
        <div className="note-container">
       <div className="note">  
        <h1>{props.answer}</h1>
        
        <p>{props.question}</p>
        <button>DELETE</button>

       </div>
       </div>
    );
}

export default Note;