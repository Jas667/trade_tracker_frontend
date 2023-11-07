import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function DeleteProfile({ deleteProfile }) {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const canConfirm = inputValue === "I WANT TO DELETE";

  const handleConfirm = () => {
    deleteProfile();
    handleClose();
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Warning. Deleting your profile will delete all associated data. This
          action cannot be undone. To continue, please type 'I WANT TO DELETE'
          below.
          <Form.Control
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="mt-3"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={!canConfirm}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteProfile;
