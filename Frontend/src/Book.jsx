/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
/* eslint-disable indent */
/* eslint-disable object-shorthand */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable quotes */
/* eslint-disable quotes */
/* eslint-disable space-infix-ops */
/* eslint-disable prefer-template */
import React from 'react';
import {
  Col,
  CardBody,
  CardGroup,
  Card,
  CardTitle,
  CardImg,
  CardSubtitle,
  CardText,
} from 'reactstrap';
import './App.css';

export default function Book(props) {
  const { book } = props;
  const category = book.category_id;
  console.log(book.image);

  return (
    <Col xl="3" md="4" sm="6" xs="12" className={`book ${category} mb-3 mt-2`}>
      <CardGroup>
        <Card>
          <CardImg src={book.image} alt={book.title} className="book-image" />
          <CardBody>
            <CardTitle>{book.title}</CardTitle>
            <CardSubtitle>{book.author}</CardSubtitle>
            <CardText>{book.subject}</CardText>

            <div className="mt-2 row">
              <CardText>{`₹ ${book.price}`}</CardText>
            </div>
          </CardBody>
        </Card>
      </CardGroup>
    </Col>
  );
}
