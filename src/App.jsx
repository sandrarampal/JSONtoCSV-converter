import "./App.css";
import { useState } from "react";

function App() {
  //Deux states, un pour le json, et un pour le csv, l'un est déclenché au remplissage de la textarea json, et l'autre au moment du submit convert, ils deviennent vides tous les deux au reset.
  const [json, setJson] = useState("");
  const [csv, setCsv] = useState("");
  const [error, setError] = useState("");

  //modifier le state json à la modification du textarea:
  const handleJsonChange = (event) => {
    const value = event.target.value;
    setJson(value);
  };

  const isValidJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  //modifier le state csv:
  const handleConversion = (event) => {
    event.preventDefault();
    let objJson = {};

    if (isValidJSON(json)) {
      //transformer la string reçue en objet
      objJson = JSON.parse(json);
      const keys = Object.keys(objJson).join();
      const values = Object.values(objJson).join();
      const csvStr = `${keys}\n${values}`;
      setCsv(csvStr);
    } else {
      setError("No valid json entered");
    }
  };

  const handleClear = (event) => {
    setJson("");
    setCsv("");
  };

  return (
    <section>
      <div>
        <textarea
          name="jsonText"
          id="jsonText"
          value={json}
          onChange={handleJsonChange}
        ></textarea>
        <button onClick={handleConversion}>Convert</button>
        <button onClick={handleClear}>Clear</button>
        <textarea
          name="csvConvert"
          id="csvConvert"
          defaultValue={csv}
        ></textarea>
        {error && <span>{error}</span>}
      </div>
    </section>
  );
}

export default App;
