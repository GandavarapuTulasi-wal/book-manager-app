/* eslint-disable jsx-quotes */
import React, { useContext } from 'react';
import Book from './Book';
import BookContext from './BookContext';
import { Container, Row } from 'reactstrap';

export default function BooksContainer() {
  const { state } = useContext(BookContext);
  return (
    <Container fluid="xl" className="team1-book-container clearfix">
      <Row>
        {state.books.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </Row>
    </Container>
  );
}
