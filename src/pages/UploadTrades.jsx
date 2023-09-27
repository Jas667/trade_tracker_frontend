import React from "react";
import ColorSchemesExample from "../components/NavBar";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { uploadTrades } from "../services/uploadExcelService";
import { Alert, Spinner } from "react-bootstrap";

export default function UploadTradesFromExcel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null); // This can be 'success' or 'danger'
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.name.endsWith(".csv")) {
      setSelectedFile(file);
    } else {
      alert("Please select a CSV file.");
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      const response = await uploadTrades(selectedFile);

      if (response.status === 201) {
        setAlertType("success");
        setAlertMessage("File uploaded successfully!");
      } else {
        setAlertType("danger");
        setAlertMessage("Something went wrong. Please try again.");
      }
      setSelectedFile(null);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ColorSchemesExample />
      <Card>
        <Card.Header>Upload Trades</Card.Header>
        <Card.Body>
          <Card.Title>Trade Zero Upload</Card.Title>
          <Card.Text>
            Please select a .csv file to upload. Accepted format is Trade Zero
            standard.
          </Card.Text>
          {isLoading && (
            <div className="d-flex justify-content-center my-4">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          )}
          {alertMessage && (
            <Alert
              variant={alertType}
              onClose={() => setAlertMessage(null)}
              dismissible
            >
              {alertMessage}
            </Alert>
          )}
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={handleFileChange}
          />
          <br />
          <Button
            variant="dark"
            type="submit"
            disabled={!selectedFile}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
