import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const s1 = {
    name: "Yogesh Saini",
    class: "5th",
  };
  const [state, setState] = useState(s1);

  const updateState = () => {
    setTimeout(() => {
      setState({
        name: "yogesh",
        class: "32",
      });
    }, 2000);
  };
  return (
    <NoteContext.Provider value={{ state, updateState }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
