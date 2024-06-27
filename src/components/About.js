import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";

const About = () => {
  const a = useContext(NoteContext);
  useEffect(() => {
    a.updateState();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <h1>
        this is about {a.state.name} from {a.state.class} class
      </h1>
    </>
  );
};

export default About;
