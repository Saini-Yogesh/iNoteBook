import React from "react";
import noteContext from "../context/notes/NoteContext";
import { useContext } from "react";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-center">
            <h5 className="card-title"> {note.tittle}</h5>
            <i
              className="mx-3 fa-solid fa-trash"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
            <i
              className="mx-3 fa-solid fa-pen-to-square"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
