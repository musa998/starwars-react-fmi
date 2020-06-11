import React, { useState, useEffect } from 'react';
import * as starwars from 'api/starwars';
import { useQuery, queryCache } from 'react-query';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import { Formik } from 'formik';
import { FilmModel } from 'types/models';
import { TextAreaField } from 'components/generic/index';
import Modal from 'react-bootstrap/Modal';
import FormGroup from 'react-bootstrap/FormGroup';

function Films() {
  const { data: films } = useQuery(['films', 'all'], (key, u) =>
    starwars.getAllFilms()
  );

  const deleteItem = (index: number) => {
    const filmsArray = films;
    filmsArray?.splice(index, 1);
    queryCache.setQueryData('films', filmsArray);
  };
  const editItem = (film: FilmModel) => {
    const filmsArray = films;
    filmsArray?.forEach(function (value, index) {
      if (filmsArray[index].title === film.title) {
        filmsArray[index].director = film.director;
        filmsArray[index].opening_crawl = film.opening_crawl;
      }
    });
    queryCache.setQueryData('films', filmsArray);
  };
  const [filmToEdit, setfilmToEdit] = useState<FilmModel>();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="container">
      <>
        {films?.map((film, index) => (
          <CardDeck>
            <Card key={index} style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{film.title}</Card.Title>
                <Card.Text>Description: {film.opening_crawl}</Card.Text>
                <Card.Text>Director: {film.director}</Card.Text>
                <Card.Text>Producer: {film.producer}</Card.Text>
                <Button variant="danger" onClick={() => deleteItem(index)}>
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setfilmToEdit(film);
                    handleShow();
                  }}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
          </CardDeck>
        ))}
      </>

      <Formik
        initialValues={{
          title: filmToEdit?.title,
          description: filmToEdit?.opening_crawl,
          director: filmToEdit?.director,
        }}
        onSubmit={async (values, actions) => {
          console.log(values.title);
          const filmEdit = {
            title: filmToEdit?.title,
            opening_crawl: values.description,
            director: values.director,
          };
          await editItem(filmEdit);
          actions.setSubmitting(false);
          handleClose();
        }}
      >
        {({ isSubmitting, handleSubmit, values, initialValues }) => {
          console.log(values.description);
          return (
            <Modal show={show} onHide={handleClose}>
              <Modal.Body>
                <TextAreaField
                  name="description"
                  placeholder="Description"
                  disabled={isSubmitting}
                  value={values.description}
                />
                <TextAreaField
                  name="director"
                  placeholder="Director"
                  disabled={isSubmitting}
                  value={values.director}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleSubmit();
                    handleClose();
                  }}
                >
                  {isSubmitting ? 'Editing...' : 'Edit'}
                </Button>
                <Button variant="danger" onClick={handleClose}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          );
        }}
      </Formik>
    </div>
  );
}
export default Films;
