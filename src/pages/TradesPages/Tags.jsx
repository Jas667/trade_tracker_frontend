import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import ColorSchemesExample from "../../components/NavBar/NavBar";
import {
  getTags,
  addTagGlobally,
  deleteTagGlobally,
  editTagNameGlobally,
} from "../../services/tagService";
import DismissibleAlert from "../../components/DismissIbleAlert";

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [tagArrayObject, setTagArrayObject] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const [refreshTags, setRefreshTags] = useState(false); //this is a dummy state to force a rerender of the tags

  const [newTag, setNewTag] = useState("");
  const [editTag, setEditTag] = useState("");
  const [tagToEdit, setTagToEdit] = useState(null);
  const [tagToDelete, setTagToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await getTags();
      if (response.message === "Tags found") {
        const fetchedTags = response.data.tags;
        const tagNames = fetchedTags.map((tag) => tag.tag_name);
        const tagArrayObject = fetchedTags.map((tag) => ({
          tag_name: tag.tag_name,
          tag_id: tag.id,
        }));

        setTags(tagNames);
        setTagArrayObject(tagArrayObject);
      }
    };

    fetchTags();
  }, [refreshTags]);

  const handleAddTag = async () => {
    // Call API to add a tag
    const response = await addTagGlobally({ tag_name: [newTag] });
    if (response.statusCode === 400) {
      setErrorMessage(response.message);
      setShowAlert(true);
      setNewTag("");
    } else {
      setRefreshTags((prev) => !prev);
      setNewTag("");
      setShowAlert(false);
    }
  };

  const handleSaveEditedTag = async () => {
    //find the tag id using the name of clicked tag
    const tagId = tagArrayObject.find(
      (tag) => tag.tag_name === tagToEdit
    ).tag_id;
    
    const response = await editTagNameGlobally(tagId, editTag);
    
    if (response.message === "Tag updated") {
      setRefreshTags((prev) => !prev);
      setShowEditModal(false);
    } else {
      setShowEditModal(false);
      setErrorMessage(response.message);
      setShowAlert(true);
    }

  };

  const handleDeleteTag = async () => {
    //find the tag id using the name of clicked tag
    const tagId = tagArrayObject.find(
      (tag) => tag.tag_name === tagToDelete
    ).tag_id;

    const response = await deleteTagGlobally(tagId);
    if (response.status === 204) {
      setRefreshTags((prev) => !prev);
      setShowDeleteModal(false);
    } else {
      setErrorMessage(response.message);
      setShowAlert(true);
    }
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
          <DismissibleAlert
            message={errorMessage}
            show={showAlert}
            onClose={() => setShowAlert(false)}
          />
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
            <p>Editing this tag will change the tag for all associated trades.</p>
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
            <p>
              WARNING! Deleting this tag will also delete it from all associated
              trades. This action cannot be undone.
            </p>
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
