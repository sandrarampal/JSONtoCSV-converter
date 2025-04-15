import "./App.css";
import { useState } from "react";
import FileUploader from "./components/FileUploader";
import Button from "./components/Button";
import InputArea from "./components/InputArea";

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

  //modifier le json s'il y a un file

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = e.target.result;
          setJson(jsonData);
        } catch (error) {
          console.error(error);
        }
      };
      reader.readAsText(file);
    } else {
      setError("File not found");
    }
  };

  //vérifier que le json est valide
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

  //exporter en CSV

  const exportToCsv = (event) => {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "download.csv";
    link.click();
  };

  return (
    <section>
      <div>
        <FileUploader onChange={handleFileChange} id="fileUpload" />
        <InputArea
          name="jsonText"
          id="jsonText"
          value={json}
          onChange={handleJsonChange}
        />
        <Button onClick={handleConversion} content="Convert" />
        <Button onClick={handleClear} content="Clear" />
        <InputArea name="csvConvert" id="csvConvert" defaultValue={csv} />
        <Button onClick={exportToCsv} content="Save CSV" />
        {error && <span>{error}</span>}
      </div>
    </section>
  );
}

export default App;
