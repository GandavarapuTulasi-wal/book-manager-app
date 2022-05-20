/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-no-duplicate-props */

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Button,
  Input,
  FormText,
} from 'reactstrap';
import BookContext from './BookContext';

export default function AddBook(props) {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const { add, setAddBook } = props;
  const { getBooks } = useContext(BookContext);

  const token = JSON.parse(localStorage.getItem('regtoken'));
  const [toggle, setToggle] = useState(true);
  const changeToggle = () => {
    setToggle(!toggle);
    setAddBook(false);
  };
  const formik = useFormik({
    initialValues: {
      title: '',
      price: '',
      subject: '',
      author: '',
      category_id: '',
      availability: '1',
      image: '',
    },
    onSubmit(values) {
      console.log(values.image);
      const formData = new FormData();
      formData.append('image', values.image);
      formData.append('title', values.title);
      formData.append('subject', values.subject);
      formData.append('price', values.price);
      formData.append('author', values.author);
      formData.append('category_id', values.category);
      formData.append('availability', values.availability);

      console.log(formData);
      // Posting the book data to the backend

      try {
        const res = axios.post('/books', formData, {
          headers: { token },
        });
        alert('Book added successfully');
        setToggle(false);
        setAddBook(false);
        getBooks();
      } catch (error) {
        console.log(error);
      }
    },
    validate() {
      const errors = {};
      if (
        formik.values.title.length <= 5 ||
        formik.values.title.length >= 100
      ) {
        errors.title = '* title should have length min 5 ,max 100 chars';
      }
      if (
        formik.values.subject.length <= 10 ||
        formik.values.subject.length >= 500
      ) {
        errors.subject = '* subject body should have range between 10 and 500';
      }
      if (
        formik.values.author.length <= 5 ||
        formik.values.author.length >= 50
      ) {
        errors.author = '* author name should have range from 5 to 50 chars';
      }
      if (formik.values.price.length <= 1) {
        errors.price = '* price should not be empty';
      }

      return errors;
    },
  });
  // Fetching the categories data from the backend
  useEffect(() => {
    axios
      .get('/category', { headers: { token } })
      .then((res) => {
        setCategory(res.data.category_list);
        console.log('Category', res.data.category_list);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <Modal isOpen={toggle} className="h-auto">
      <Form
        onSubmit={formik.handleSubmit}
        noValidate
        encType="multipart/form-data"
      >
        <ModalHeader className="text-center" toggle={changeToggle}>
          Add Book
        </ModalHeader>
        <ModalBody>
          <div className="card mx-auto p-4">
            <FormGroup>
              <Input
                required
                type="text"
                name="title"
                className="my-3  mx-auto"
                placeholder="Enter title Name"
                onChange={formik.handleChange}
                value={formik.values.title}
                invalid={formik.errors.title && formik.touched.title}
                required
              />
              {formik.touched.title && formik.errors.title && (
                <FormText color="danger">{formik.errors.title}</FormText>
              )}
            </FormGroup>
            <FormGroup>
              <Input
                required
                type="text"
                name="author"
                className="form-control my-1  mx-auto"
                placeholder="Enter author Name"
                onChange={formik.handleChange}
                value={formik.values.author}
                required
                invalid={formik.errors.author && formik.touched.author}
              />
              {formik.touched.author && formik.errors.author && (
                <FormText color="danger">{formik.errors.author}</FormText>
              )}
            </FormGroup>
            <FormGroup>
              <Input
                required
                type="number"
                name="price"
                className="my-1 mx-auto"
                placeholder="Enter Product Price"
                onChange={formik.handleChange}
                value={formik.values.price}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                required
                type="file"
                accept="image/*"
                name="image"
                className="my-1 mx-auto"
                id="file_input"
                onChange={(e) => {
                  formik.setFieldValue('image', e.currentTarget.files[0]);
                }}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="select"
                required
                name="category"
                className="my-1 mx-auto"
                onChange={formik.handleChange}
                value={formik.values.category}
                required
              >
                <option>Select category</option>
                {category.map((val) => {
                  return <option value={val.id}>{val.category_name}</option>;
                })}
              </Input>
            </FormGroup>
            <FormGroup>
              <Input
                required
                type="select"
                name="availability"
                className="my-1 mx-auto"
                onChange={formik.handleChange}
                value={formik.values.availability}
                required
              >
                <option value="1">available</option>
                <option value="0">not available</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Input
                type="textarea"
                required
                className="my-1 mx-auto"
                placeholder="Enter Subject of the Book......"
                name="subject"
                onChange={formik.handleChange}
                value={formik.values.subject}
                required
                invalid={formik.errors.subject && formik.touched.subject}
              />
              {formik.touched.subject && formik.errors.subject && (
                <FormText color="danger">{formik.errors.subject}</FormText>
              )}
            </FormGroup>
            <FormGroup className="text-center">
              <Button color="primary" type="submit">
                Add Book
              </Button>
            </FormGroup>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}
