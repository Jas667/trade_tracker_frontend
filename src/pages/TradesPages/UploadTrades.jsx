import React from "react";
import ColorSchemesExample from "../../components/NavBar/NavBar";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { uploadTrades } from "../../services/uploadExcelService";
import { Alert, Spinner } from "react-bootstrap";

export default function UploadTradesFromExcel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null); // This can be 'success' or 'danger'
  const [isLoading, setIsLoading] = useState(false);
  const [inputKey, setInputKey] = useState(Date.now()); // Using the current timestamp as an initial value. Will be used to reset the input field

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.name.endsWith(".csv")) {
      setSelectedFile(file);
    } else {
      setAlertType("danger");
      setAlertMessage("Incorrect file format. Please select a CSV file.");
      setSelectedFile(null);
      setInputKey(Date.now());
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      const response = await uploadTrades(selectedFile);
      const data = await response.json();

      if (response.status === 201) {
        setAlertType("success");
        setAlertMessage("File uploaded successfully!");
      } else if (data.message.includes("Uploads not available for test users")) {
        setAlertType("danger");
        setAlertMessage("Uploads not available for test users. Please use dummy data from dates 01-08-2023 to 31-08-2023");
      } else {
        setAlertType("danger");
        setAlertMessage("Something went wrong. Please try again.");
      }
      setSelectedFile(null);
      setInputKey(Date.now()); // Resetting the input field
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ColorSchemesExample />
      {/* <SideBar /> */}
      <div className="my-3 mx-40 bg-gray-50 flex flex-col justify-center overflow-hidden">
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
            key={inputKey}
            className="form-control"
            type="file"
            id="formFile"
            onChange={handleFileChange}
          />
          <br />
          <Button
            variant="dark"
            type="submit"
            disabled={!selectedFile || isLoading}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Card.Body>
      </Card>
      </div>
    </>
  );
}
