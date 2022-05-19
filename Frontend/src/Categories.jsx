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
/* eslint-disable object-shorthand */
/* eslint-disable camelcase */

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import BookContext from './BookContext';
import './styles/Categories.css';

export default function Categories() {
  const { dispatch } = useContext(BookContext);
  const [categories, setCategories] = useState([]);
  // Fetching categories data from backend
  useEffect(() => {
    axios.get('/category').then((response) => {
      const categoriess = response.data.category_list;
      const category_all = { id: 0, category_id: 0, category_name: 'All' };
      setCategories([category_all, ...categoriess]);
    });
  }, []);
  console.log(categories);
  return (
    <div className="category-container">
      <div className="categories">
        {categories.map((categorie) => {
          const categoryName = categorie.category_name;
          const category = categoryName.replace(' ', '-').replace("'", '');
          const category_id = categorie.id;
          console.log(category);
          if (category === 'All') {
            return (
              <button
                type="button"
                className={`btn text-light category-item All active-category ${category_id}`}
                key={category}
                onClick={() => {
                  dispatch({ type: 'filter', category_id, category });
                }}
              >
                {category}
              </button>
            );
          }
          return (
            <button
              type="button"
              className={`btn text-light category-item ${category_id}`}
              key={category}
              onClick={() => {
                dispatch({ type: 'filter', category_id, category });
              }}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
