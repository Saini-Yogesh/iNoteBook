import React, { useState } from "react";
import noteContext from "../context/notes/NoteContext";
import { useContext } from "react";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    tittle: "",
    descripation: "",
    tag: "general",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.tittle, note.descripation, note.tag);
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container my-3">
        <h2> Add a note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="tittle" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="tittle"
              name="tittle"
              className="form-control"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="descripation" className="form-label">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="descripation"
              className="form-control"
              onChange={onChange}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
