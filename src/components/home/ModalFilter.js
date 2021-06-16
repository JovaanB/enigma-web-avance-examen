import React from 'react';
import {Modal, Button} from 'react-bootstrap';

export const ModalFilter = ({showFilterModal, setShowFilterModal}) => {
  return (
    <Modal
      show={showFilterModal}
      onHide={() => setShowFilterModal(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Filtrer les données</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowFilterModal(false)}>
          Fermer
        </Button>
        <Button variant="primary">Rechercher</Button>
      </Modal.Footer>
    </Modal>
  );
};
