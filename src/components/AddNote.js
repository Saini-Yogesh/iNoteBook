import React, { useState } from "react";
import noteContext from "../context/notes/NoteContext";
import { useContext } from "react";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    tittle: "",
    descripation: "",
    tag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.tittle, note.descripation, note.tag);
    setNote({
      id: "",
      tittle: "",
      descripation: "",
      tag: "",
    });
    props.showAlert("Notes added succesfuly", "success");
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
              value={note.tittle}
              type="text"
              id="tittle"
              name="tittle"
              className="form-control"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="descripation" className="form-label">
              Description
            </label>
            <input
              value={note.descripation}
              type="text"
              id="description"
              name="descripation"
              className="form-control"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              value={note.tag}
              type="text"
              id="tag"
              name="tag"
              className="form-control"
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            disabled={note.tittle.length < 5 || note.descripation.length < 5}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
