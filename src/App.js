import "./App.css";

import { useEffect, useState } from "react";
import * as Tone from "tone";
import SolfeggioBox from "./components/SolfeggioBox/SolfeggioBox";
import React from "react";
import ChakraBox from "./components/ChakraBox/ChakraBox";
import PNOsc from "components/PNOsc/PNOsc";

function App() {
  const [visibleComponents, setVisibleComponents] = useState([]);

  useEffect(() => {
    // Tone.start();
    // Tone.context.resume();
    document.addEventListener("keydown", () => {
      Tone.context.resume();
    });
  }, []);

  const handleCheckToggle = (e) => {
    const { id, checked } = e.target;

    if (!checked && visibleComponents.includes(id)) {
      setVisibleComponents(
        visibleComponents.filter((component) => component !== id)
      );
      return;
    }

    setVisibleComponents([...visibleComponents, id]);
  };

  return (
    <div className="App">
      <div>
        <h1>Components</h1>
        <div onClick={handleCheckToggle}>
          <label>
            <input type="checkbox" id="solfeggioBox" />
            Solfeggio Box
          </label>
          <label>
            <input type="checkbox" id="chakraBox" />
            Chakra Box
          </label>
        </div>
      </div>
      {visibleComponents.includes("solfeggioBox") && <SolfeggioBox />}
      {visibleComponents.includes("chakraBox") && <ChakraBox />}
    </div>
  );
}

export default App;
