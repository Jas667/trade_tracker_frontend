import React, { useState } from "react";
import { deleteImage } from "../services/imageService";
import { Alert } from "react-bootstrap";

const ImageGallery = ({ images, onDeleteImage }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [showModal, setShowModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const [alertKey, setAlertKey] = useState(0);

  const handleDelete = (img) => {
    setImageToDelete(img);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    const response = await deleteImage(imageToDelete);
    if (response.status === 204) {
      setAlertType("success");
      setAlertMessage("Image deleted successfully!");
      setAlertKey((prev) => prev + 1);
      setImageToDelete(null);
      setShowModal(false);

      onDeleteImage();
    } else {
      setAlertType("danger");
      setAlertMessage("Error deleting image. Please try again.");
      setAlertKey((prev) => prev + 1);
    }
  };

  const handleImageClick = (img, index) => {
    setSelectedImage(img.image_url);
    setSelectedImageIndex(index);
  };

  const moveToNextImage = (event) => {
    event.stopPropagation();
    if (selectedImageIndex < images.length - 1) {
      const newIndex = selectedImageIndex + 1;
      setSelectedImageIndex(newIndex);
      setSelectedImage(images[newIndex].image_url);
    }
  };

  const moveToPreviousImage = (event) => {
    event.stopPropagation();
    if (selectedImageIndex > 0) {
      const newIndex = selectedImageIndex - 1;
      setSelectedImageIndex(newIndex);
      setSelectedImage(images[newIndex].image_url);
    }
  };

  return (
    <div>
      {alertMessage && (
        <div className="mb-4">
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
        </div>
      )}
      <div className="grid lg:grid-cols-2 gap-4">
        {images.map((imageObj, index) => (
          <div key={imageObj.id} className="relative group">
            <img
              src={`${API_BASE_URL}userImageUploads/${imageObj.image_url}`}
              alt={`Trade Image ${index}`}
              className="w-full h-auto transition-transform transform group-hover:scale-105"
              onClick={() => handleImageClick(imageObj, index)}
            />
            <button
              onClick={() => handleDelete(imageObj.id)}
              className="absolute bottom-0 right-0 bg-red-500 hover:bg-red-700 text-white py-1 px-3"
            >
              Delete
            </button>
          </div>
        ))}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h4 className="mb-4">Confirm Deletion</h4>
              <p>
                Are you sure you want to delete this image? This action cannot
                be undone.
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 rounded hover:bg-red-700 text-white"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        {selectedImage && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 p-20 max-w-2/5 max-h-2/5 "
            onClick={() => setSelectedImage(null)}
          >
            {selectedImageIndex > 0 && (
              <button
                onClick={(event) => moveToPreviousImage(event)}
                className="absolute left-0 my-auto h-12 w-12 bg-gray-500 hover:bg-gray-700 text-white rounded-full opacity-70"
              >
                {"<"}
              </button>
            )}
            {selectedImageIndex < images.length - 1 && (
              <button
                onClick={(event) => moveToNextImage(event)}
                className="absolute right-0 my-auto h-12 w-12 bg-gray-500 hover:bg-gray-700 text-white rounded-full opacity-70"
              >
                {">"}
              </button>
            )}

            <img
              src={`${API_BASE_URL}userImageUploads/${selectedImage}`}
              alt="Enlarged"
              className="object-contain w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
