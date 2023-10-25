import React, { useState } from "react";

const ImageGallery = ({ images }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [showModal, setShowModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDelete = (img) => {
    setImageToDelete(img);
    setShowModal(true);
  };

  const confirmDelete = () => {
    // Here you'd normally use the API to delete the image.
    console.log(`Deleted ${imageToDelete}`);
    setImageToDelete(null);
    setShowModal(false);
  };

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {images.map((img, index) => (
        <div key={index} className="relative group">
          <img
            src={`${API_BASE_URL}userImageUploads/${img}`}
            alt={`Trade Image ${index}`}
            className="w-full h-auto transition-transform transform group-hover:scale-105"
            onClick={() => handleImageClick(img)}
          />
          <button
            onClick={() => handleDelete(img)}
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
              Are you sure you want to delete this image? This action cannot be
              undone.
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
          <img
            src={`${API_BASE_URL}userImageUploads/${selectedImage}`}
            alt="Enlarged"
            className="object-contain w-full h-full"
          />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
