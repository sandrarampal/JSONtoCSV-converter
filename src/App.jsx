import "./App.css";
import { useState } from "react";
import FileUploader from "./components/FileUploader/FileUploader";
import Button from "./components/Button";
import InputArea from "./components/InputArea/InputArea";
import { RiDeleteBin6Fill } from "react-icons/ri";

function App() {
  //Deux states, un pour le json, et un pour le csv, l'un est déclenché au remplissage de la textarea json, et l'autre au moment du submit convert, ils deviennent vides tous les deux au reset.
  const [json, setJson] = useState("");
  const [csv, setCsv] = useState("");
  const [error, setError] = useState("");
  const [saveName, setSaveName] = useState("");
  const [saveNameJson, setSaveNameJson] = useState("");

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

  //conversion en csv:
  const handleConvertToCsv = (event) => {
    event.preventDefault();
    let objJson = {};

    if (isValidJSON(json)) {
      //transformer la string reçue en objet
      objJson = JSON.parse(json);
      const array = Array.isArray(objJson) ? objJson : [objJson];
      const keys = Object.keys(array[0]).join();
      const values = Object.values(array[0]).join();
      const csvStr = `${keys}\n${values}`;
      setCsv(csvStr);
    } else {
      setError("No valid json entered");
    }
  };

  //handle change csv
  const handleCsvChange = (event) => {
    const value = event.target.value;
    setCsv(value);
  };

  //modifier le csv s'il y a un file
  const handleFileCsvChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const csvData = e.target.result;
          setCsv(csvData);
        } catch (error) {
          console.error(error);
        }
      };
      reader.readAsText(file);
    } else {
      setError("File not found");
    }
  };

  //vérifier que le csv est valide
  const isValidCsv = (str) => {
    if (str.includes(",") && str.includes("\n")) {
      return true;
    } else {
      return false;
    }
  };

  //conversion en json
  const handleConvertToJson = (event) => {
    event.preventDefault();
    if (isValidCsv(csv)) {
      const lines = csv.trim().split("\n");
      const headers = lines[0].split(",");
      const jsonArray = [];

      for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(",");
        const jsonObject = {};
        for (let j = 0; j < headers.length; j++) {
          jsonObject[headers[j].trim()] = currentLine[j]
            ? currentLine[j].trim()
            : null;
        }
        jsonArray.push(jsonObject);
      }
      const jsonStr = JSON.stringify(jsonArray);
      setJson(jsonStr);
    } else {
      setError("No valid csv entered");
    }
  };

  //tout retirer en cas de clear:
  const handleClear = (event) => {
    setJson("");
    setCsv("");
  };

  //modifier le nom du fichier csv
  const handleSaveChange = (event) => {
    const value = event.target.value;
    setSaveName(value);
  };
  //modifier le nom du fichier json
  const handleSaveJsonChange = (event) => {
    const value = event.target.value;
    setSaveNameJson(value);
  };

  //exporter en CSV
  const exportToCsv = (event) => {
    if (csv) {
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = saveName ? `${saveName}.csv` : "download.csv";
      link.click();
    } else {
      setError("No CSV to save");
    }
  };
  //exporter en json
  const exportToJson = (event) => {
    if (json) {
      const blob = new Blob([json], { type: "text/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = saveNameJson ? `${saveNameJson}.json` : "download.json";
      link.click();
    } else {
      setError("No json to save");
    }
  };

  return (
    <section>
      <h1>Simple JSON - CSV Converter</h1>
      <div>
        <div className="json-div">
          <FileUploader
            onChange={handleFileChange}
            id="fileUpload"
            accept=".json"
            title="JSON"
          />
          <InputArea
            name="jsonText"
            id="jsonText"
            value={json}
            onChange={handleJsonChange}
          />
          <div className="save-file">
            <div>
              <input
                placeholder="download"
                onChange={handleSaveJsonChange}
                value={saveNameJson}
              />
              <span>.json</span>
            </div>
            <Button onClick={exportToJson} content="Save Json" />
          </div>
        </div>

        <div className="buttons">
          <Button onClick={handleConvertToCsv} content="> CSV" />
          <Button onClick={handleConvertToJson} content="< JSON" />
          <div onClick={handleClear}>
            <RiDeleteBin6Fill />
          </div>
          {error && <span>{error}</span>}
        </div>

        <div className="csv-div">
          <FileUploader
            onChange={handleFileCsvChange}
            id="fileUploadCsv"
            accept=".csv"
            title="CSV"
          />
          <InputArea
            name="csvConvert"
            id="csvConvert"
            value={csv}
            onChange={handleCsvChange}
          />
          <div className="save-file">
            <div>
              <input
                placeholder="download"
                onChange={handleSaveChange}
                value={saveName}
              />
              <span>.csv</span>
            </div>
            <Button onClick={exportToCsv} content="Save CSV" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
