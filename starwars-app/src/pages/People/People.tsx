import React, { useState } from 'react';
import * as starwars from 'api/starwars';
import { useQuery, queryCache } from 'react-query';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import Modal from 'react-bootstrap/Modal';
import FormGroup from 'react-bootstrap/FormGroup';

function People() {
  const { data: peoples } = useQuery(['peoples', 'all'], (key, u) =>
    starwars.getAllPeople()
  );

  const deleteItem = (index: number) => {
    const peopleArray = peoples;
    peopleArray?.splice(index, 1);
    queryCache.setQueryData('peoples', peopleArray);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="container">
      {peoples?.map((people, index) => (
        <>
          <CardDeck>
            <Card key={index} style={{ marginBottom: '1rem', width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{people.name}</Card.Title>
                <Card.Text>Birth Year: {people.birth_year}</Card.Text>
                <Card.Text>Eye Color: {people.eye_color}</Card.Text>
                <Card.Text>Gender: {people.gender}</Card.Text>
                <Button variant="danger" onClick={() => deleteItem(index)}>
                  Delete
                </Button>
                <Button onClick={() => handleShow()} variant="secondary">
                  Edit
                </Button>
              </Card.Body>
            </Card>
          </CardDeck>
        </>
      ))}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <FormGroup>
            <input type="text" placeholder="Name" />
          </FormGroup>
          <FormGroup>
            <input type="text" placeholder="Birth Year" />
          </FormGroup>
          <FormGroup>
            <input type="text" placeholder="Eye Color" />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
            }}
          >
            Edit
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default People;
