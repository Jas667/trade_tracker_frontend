import React, { useState, useRef } from "react";
import { uploadImage } from "../services/imageService";
import { Alert } from "react-bootstrap";

const ImageUpload = ({ onImageUpload, selectedTrade }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const [alertKey, setAlertKey] = useState(0);

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      file.size < 5 * 1024 * 1024 &&
      (file.type === "image/jpeg" || file.type === "image/png")
    ) {
      setSelectedFile(file);
    } else {
      // Error handling
      if (file.size >= 5 * 1024 * 1024) {
        setAlertType("danger");
        setAlertMessage("Max file size is 5MB.");
        setAlertKey((prev) => prev + 1);
      } else {
        setAlertType("danger");
        setAlertMessage("Invalid file type. Only JPEG and PNG are allowed.");
        setAlertKey((prev) => prev + 1);
      }
      setSelectedFile(null);
      fileInputRef.current.value = null;
    }
  };

  const handleUpload = async () => {
    const response = await uploadImage(selectedFile, selectedTrade.id);
    if (response.message === "Image uploaded successfully") {
      setAlertType("success");
      setAlertMessage("Image uploaded successfully!");
      setAlertKey((prev) => prev + 1);

      setSelectedFile(null);
      fileInputRef.current.value = null;

      onImageUpload();
    }
  };

  return (
    <div className="mb-4">
      {alertMessage && (
        <Alert
          key={alertKey}
          variant={alertType}
          onClose={() => {
            setAlertMessage(null);
            setAlertType(null);
          }}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Upload Image:
      </label>
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="mb-3"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload
      </button>
    </div>
  );
};

export default ImageUpload;
