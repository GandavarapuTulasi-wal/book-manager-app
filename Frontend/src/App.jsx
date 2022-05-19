/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, { useEffect, useReducer, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookList from './BookList';

import Login from './Login';
import Home from './Home';
import AddBook from './AddBook';
import EditBook from './EditBook';
import BookContext from './BookContext';
import BookReducer from './BookReducer';
import Menu from './Menu';
import './App.css';

export default function App() {
  const [stateStatus, setStateStatus] = useState(false);
  const initialState = { books: [] };
  const [state, dispatch] = useReducer(BookReducer, initialState);

  const getBooks = () => {
    axios.get('/books').then((response) => {
      const books = [];
      response.data.books_list.forEach((book) => {
        books.push({
          id: book.id,
          title: book.title,
          author: book.author,
          price: book.price,
          category_id: book.category_id,
          availability: book.availability,
          subject: book.subject,
          image: book.image,
        });
      });
      console.log(books);
      dispatch({ type: 'set-books', bookList: books });
      setStateStatus(true);
    });
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="App">
      {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
      <BookContext.Provider value={{ state, dispatch, stateStatus, getBooks }}>
        <BrowserRouter>
          <Menu />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/edit/:id" element={<EditBook />} />
            <Route path="/list" element={<BookList />} />
          </Routes>
        </BrowserRouter>
      </BookContext.Provider>
    </div>
  );
}
