import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import ColorSchemesExample from "../../components/NavBar/NavBar";

export default function Tags() {
  const dummyTags = ["Tag1", "Tag2", "Tag3"]; // Dummy data

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [editTag, setEditTag] = useState("");
  const [tagToEdit, setTagToEdit] = useState(null);
  const [tagToDelete, setTagToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // Replace with an API call to fetch tags
    setTags(dummyTags);
  }, []);

  const handleAddTag = () => {
    // Call API to add a tag
    setTags([...tags, newTag]);
    setNewTag("");
  };

  const handleSaveEditedTag = () => {
    // Call API to edit the tag
    const updatedTags = tags.map((tag) => (tag === tagToEdit ? editTag : tag));
    setTags(updatedTags);
    setShowEditModal(false);
  };

  const handleDeleteTag = () => {
    // Call API to delete the tag
    const updatedTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(updatedTags);
    setShowDeleteModal(false);
  };

  return (
    <>
              <ColorSchemesExample />
      <div className="my-3 mx-40 bg-gray-50 flex flex-col justify-center overflow-hidden">
        <h2 className="mb-5">Tags</h2>

        <div className="mb-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-blue-500 p-4 m-1 rounded shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out text-white"
                >
                      
              {tag}
              <button
                className="ml-2 text-xs text-red-500 bg-red-100 px-2 py-0.5 rounded hover:bg-red-200 transition-all duration-200 ease-in-out"
                onClick={() => {
                  setTagToDelete(tag);
                  setShowDeleteModal(true);
                }}
              >
                Delete
              </button>
              <button
                className="ml-2 text-xs text-green-500 bg-green-100 px-2 py-0.5 rounded hover:bg-green-200 transition-all duration-200 ease-in-out"
                onClick={() => {
                  setTagToEdit(tag);
                  setEditTag(tag);
                  setShowEditModal(true);
                }}
              >
                Edit
              </button>
            </span>
          ))}
        </div>
        <div className="w-1/2">
        <input
          type="text"
          placeholder="Add a new tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="form-control mb-2"
        />
        <Button variant="secondary" onClick={handleAddTag}>
          Add Tag
        </Button>
        </div>
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>Edit Tag</Modal.Header>
          <Modal.Body>
            <input
              type="text"
              value={editTag}
              onChange={(e) => setEditTag(e.target.value)}
              className="form-control mb-2"
            />
            <p>Editing this tag will change all associated tags.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveEditedTag}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>Delete Tag</Modal.Header>
          <Modal.Body>
            <p>Deleting this tag will remove it from all associated trades.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteTag}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
              </div>
              
    </>
  );
}
