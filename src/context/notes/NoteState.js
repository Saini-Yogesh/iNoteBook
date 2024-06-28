import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "667da5f25f01b1218e4d27c7",
      user: "667da5bc5f01b1218e4d27c2",
      tittle: "notes for me",
      description: "general",
      tag: "personal",
      date: "2024-06-27T17:48:34.014Z",
      __v: 0,
    },
    {
      _id: "667da6125f01b1218e4d27cb",
      user: "667da5bc5f01b1218e4d27c2",
      tittle: "notes for me",
      description: "general",
      tag: "personal",
      date: "2024-06-27T17:49:06.550Z",
      __v: 0,
    },
    {
      _id: "667da6135f01b1218e4d27cd",
      user: "667da5bc5f01b1218e4d27c2",
      tittle: "notes for me",
      description: "general",
      tag: "personal",
      date: "2024-06-27T17:49:07.421Z",
      __v: 0,
    },
    {
      _id: "667da6185f0d1b1218e4d27cf",
      user: "667da5bc5f01b1218e4d27c2",
      tittle: "notes for me",
      description: "general",
      tag: "personal",
      date: "2024-06-27T17:49:12.233Z",
      __v: 0,
    },
    {
      _id: "667da6125f01bs1218e4d27cb",
      user: "667da5bc5f01b1218e4d27c2",
      tittle: "notes for me",
      description: "general",
      tag: "personal",
      date: "2024-06-27T17:49:06.550Z",
      __v: 0,
    },
    {
      _id: "667da6135f01b121k8e4d27cd",
      user: "667da5bc5f01b1218e4d27c2",
      tittle: "notes for me",
      description: "general",
      tag: "personal",
      date: "2024-06-27T17:49:07.421Z",
      __v: 0,
    },
    {
      _id: "667da6185f01b12k18e4d27cf",
      user: "667da5bc5f01b1218e4d27c2",
      tittle: "notes for me",
      description: "general",
      tag: "personal",
      date: "2024-06-27T17:49:12.233Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);
  // Add Note
  const addNote = (tittle, description, tag) => {
    //TODO API call
    console.log("adding a note");
    const note = {
      _id: "667da6185f01b512k18e4d27cf",
      user: "667da5bc5f01b1218e4d27c2",
      tittle: tittle,
      description: description,
      tag: tag,
      date: "2024-06-27T17:49:12.233Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  //Delete Note
  const deleteNote = (_id) => {
    setNotes(notes.delete(_id));
  };
  //Update Note
  const editNote = () => {};
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
