/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
/* eslint-disable indent */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import {
  Container,
  Row,
  Col,
  CardBody,
  CardGroup,
  Card,
  CardTitle,
  CardImg,
  CardSubtitle,
  CardText,
  Button,
} from 'reactstrap';
import BookContext from './BookContext';
import AddBook from './AddBook';
import EditBook from './EditBook';

function Books() {
  const [book, setBooks] = useState([]);
  const token = JSON.parse(localStorage.getItem('regtoken'));
  const [add, setAddBook] = useState(false);
  const [edit, setEdit] = useState(false);
  const { state, getBooks } = useContext(BookContext);
  const navigate = useNavigate('/');

  // Fetching the products data from the backend so that we can list the produts
  useEffect(() => {
    getBooks();
  }, []);
  const deleteBook = (id) => {
    const sure = confirm('Do you want to delete the book');
    if (sure) {
      axios
        .delete(`/books/${id}`, { headers: { token } })
        .then((res) => {
          getBooks();
        })
        .catch((error) => console.log(error));
      console.log(id);
    } else {
      navigate('/');
    }
  };
  return (
    <Container>
      <div className="text-right m-2">
        <Button color="warning" onClick={() => setAddBook(true)}>
          Add book
          <b>+</b>
        </Button>
      </div>
      {add ? <AddBook add={add} setAddBook={setAddBook} /> : null}

      <h1 className="text-center mb-5">Books</h1>
      <Row className="row">
        {state.books.map((val) => {
          return (
            <Col xl="3" md="4" sm="6" xs="12" className="mb-3">
              <CardGroup>
                <Card>
                  <CardImg
                    className="book-image"
                    // eslint-disable-next-line prefer-template
                    src={val.image}
                    alt={val.title}
                  />
                  <CardBody>
                    <CardTitle>
                      <p className="text-center">{val.title}</p>
                    </CardTitle>
                    <CardSubtitle className="text-center">
                      {val.author}
                    </CardSubtitle>
                    <CardText className="text-center">{val.subject}</CardText>
                    <div className="d-flex justify-content-center ">
                      <Button
                        color="danger"
                        onClick={() => deleteBook(val.id)}
                        className="m-1"
                      >
                        Delete
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path
                            fillRule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />
                        </svg>
                      </Button>
                      <Link to={`/edit/${val.id}`}>
                        <Button
                          color="primary"
                          onClick={() => setEdit(true)}
                          className="m-1"
                        >
                          Edit
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pen"
                            viewBox="0 0 16 16"
                          >
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                          </svg>
                        </Button>
                      </Link>
                      {edit ? <EditBook edit={edit} setEdit={setEdit} /> : null}
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
export default Books;
