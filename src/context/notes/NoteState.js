import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);
  // fetch all notes Note
  const getNotes = async () => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ZGE1YmM1ZjAxYjEyMThlNGQyN2MyIn0sImlhdCI6MTcxOTUxMDQ2MH0.G3aITq3wkCF0zDrI_eZQvEh6TOxJ-442dNcH-JDXHC4",
      },
    });
    const json = await response.json();
    setNotes(json);
  };
  // Add Note
  const addNote = async (tittle, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ZGE1YmM1ZjAxYjEyMThlNGQyN2MyIn0sImlhdCI6MTcxOTUxMDQ2MH0.G3aITq3wkCF0zDrI_eZQvEh6TOxJ-442dNcH-JDXHC4",
      },
      body: JSON.stringify({ tittle, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };
  //Delete Note
  const deleteNote = async (id) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/deleteNode/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ZGE1YmM1ZjAxYjEyMThlNGQyN2MyIn0sImlhdCI6MTcxOTUxMDQ2MH0.G3aITq3wkCF0zDrI_eZQvEh6TOxJ-442dNcH-JDXHC4",
      },
    });
    const json = await response.json();

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Update Note
  const editNote = async (id, tittle, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ZGE1YmM1ZjAxYjEyMThlNGQyN2MyIn0sImlhdCI6MTcxOTUxMDQ2MH0.G3aITq3wkCF0zDrI_eZQvEh6TOxJ-442dNcH-JDXHC4",
      },
      body: JSON.stringify({ tittle, description, tag }),
    });
    const json = await response.json();

    const newNotes = JSON.parse(JSON.stringify(notes));
    //login to edit
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].tittle = tittle;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
