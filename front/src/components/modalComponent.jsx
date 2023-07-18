import React from "react";
import { Button, Modal } from "react-bootstrap";
import { allTexts } from "../constants/allTexts";

function ModalComponent({
  headTitle,
  body,
  deleteModal,
  setDeleteModal,
  confirmDelete,
}) {
  return (
    <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{headTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      {headTitle === allTexts.error ? null : (
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModal(false)}>
            {allTexts.cancel}
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            {allTexts.delete}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default ModalComponent;
