/* eslint-disable linebreak-style */
import React from 'react';

import BooksContainer from './BooksContainer';
import Categories from './Categories';

export default function Home() {
  return (
    <div>
      <Categories />
      <BooksContainer />
    </div>
  );
}
