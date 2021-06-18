import React from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

export const ModalFilter = ({
  showFilterModal,
  setShowFilterModal,
  filters,
  setFilters,
  afterFilter,
  resetFilters,
}) => {
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
      <Modal.Body>
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            className="my-2"
            label="Enlever les données sans photo"
            defaultChecked={filters?.picture}
            onChange={e =>
              setFilters(prevState => ({
                ...prevState,
                picture: e.target.checked,
              }))
            }
          />

          <Form.Group controlId="formName">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="3-D Man"
              value={filters?.name}
              onChange={e =>
                setFilters(prevState => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Rick Jones has been Hulk's best..."
              value={filters?.description}
              onChange={e =>
                setFilters(prevState => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }
            />
          </Form.Group>

          <Form.Group controlId="formComics">
            <Form.Label>Nombre de comics</Form.Label>
            <Form.Control
              type="number"
              placeholder="12"
              value={filters?.comics}
              onChange={e =>
                setFilters(prevState => ({
                  ...prevState,
                  comics: e.target.value,
                }))
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="mr-auto"
          variant="light"
          onClick={() => {
            resetFilters();
            setFilters({
              picture: false,
              name: '',
              description: '',
              comics: undefined,
            });
            setShowFilterModal(false);
          }}
        >
          Effacer les filtres
        </Button>
        <Button variant="secondary" onClick={() => setShowFilterModal(false)}>
          Fermer
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            afterFilter();
            setShowFilterModal(false);
          }}
        >
          Rechercher
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
