import React from "react";
import ColorSchemesExample from "../components/NavBar";
import { useState } from "react";
import { uploadTrades } from "../services/uploadExcelService";

export default function UploadTrades() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.name.endsWith(".csv")) {
      setSelectedFile(file);
    } else {
      alert("Please select a CSV file.");
      setSelectedFile(null);
    }
  };
  return (
    <>
      <ColorSchemesExample />
      <div>Upload Trades</div>
      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">
          Default file input example
        </label>
        <input
          className="form-control"
          type="file"
          id="formFile"
          onChange={handleFileChange}
        />
      </div>
    </>
  );
}
