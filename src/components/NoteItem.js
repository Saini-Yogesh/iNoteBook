import React from "react";

const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-center">
            <h5 className="card-title"> {note.tittle}</h5>
            <i className="mx-3 fa-solid fa-trash"></i>
            <i className="mx-3 fa-solid fa-pen-to-square"></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
