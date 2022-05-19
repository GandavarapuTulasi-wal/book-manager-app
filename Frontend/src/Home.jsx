import React, { useContext } from 'react';

import BooksContainer from './BooksContainer';
import BookContext from './BookContext';
import Categories from './Categories';

export default function Home() {
  const { stateStatus } = useContext(BookContext);
  return (
    <div>
      <Categories />
      <BooksContainer />
    </div>
  );
}
