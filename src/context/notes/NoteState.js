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
      _id: "667da6185f01b1218e4d27cf",
      user: "667da5bc5f01b1218e4d27c2",
      tittle: "notes for me",
      description: "general",
      tag: "personal",
      date: "2024-06-27T17:49:12.233Z",
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
      _id: "667da6185f01b1218e4d27cf",
      user: "667da5bc5f01b1218e4d27c2",
      tittle: "notes for me",
      description: "general",
      tag: "personal",
      date: "2024-06-27T17:49:12.233Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
