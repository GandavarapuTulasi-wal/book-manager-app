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
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-no-bind */
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
} from 'reactstrap';
import BookContext from './BookContext';

function EditBook(props) {
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [availability, setAvailability] = useState();
  const { getBooks } = useContext(BookContext);
  const [price, setPrice] = useState();
  const [subject, setSubject] = useState();
  const [category, setCategory] = useState();
  const [categorydata, setCategorydata] = useState([]);
  const [finalCat, setFinalCat] = useState(1);
  const [error, setError] = useState(false);
  const urlParams = useParams();
  const { edit, setEdit } = props;
  console.log('category', category);
  console.log('urlParams', urlParams);
  const token = JSON.parse(localStorage.getItem('regtoken'));
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const changeToggle = () => {
    setToggle(!toggle);
    navigate('/list');
  };

  useEffect(() => {
    axios
      .get('/category', {
        headers: {
          token,
        },
      })
      .then((res) => setCategorydata(res.data.category_list))
      .catch((errors) => console.log(errors));
  }, []);
  useEffect(() => {
    axios
      .get(`/books/${urlParams.id}`, {
        headers: {
          token,
        },
      })
      .then((response) => {
        console.log('output', response.data.books_data);

        setTitle(response.data.book_data.title);
        setAuthor(response.data.book_data.author);
        setPrice(response.data.book_data.price);
        setAvailability(response.data.book_data.availability);

        setSubject(response.data.book_data.subject);
        setCategory(response.data.book_data.category_id);
      });
  }, []);
  function updateDetails(e) {
    e.preventDefault();
    const data = {
      title: title,
      author: author,
      price: price,
      availability: availability,
      subject: subject,
      category_id: finalCat,
    };
    axios
      .put(`/books/${urlParams.id}`, data, {
        headers: {
          token,
        },
      })
      .then((response) => {
        console.log(response);
        alert('updated successfully');
        setToggle(false);
        setEdit(false);
        setError(false);
      })
      .catch((error) => {
        setError(true);
        console.log('An error occurred:', error.response);
      });
    getBooks();
  }
  return (
    <div>
      <Modal isOpen={toggle} fullscreen className="h-auto">
        <ModalHeader toggle={changeToggle}>
          Update the details of Book with Id :{urlParams.id}
        </ModalHeader>
        <Form
          onSubmit={updateDetails}
          className="card mx-auto col-lg-4 col-md-6 mt-4 p-2 mb-4"
        >
          <ModalBody>
            <div>
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  id="title"
                  className="mb-2"
                  value={title || ''}
                  onInput={(e) => setTitle(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Author</Label>
                <Input
                  type="text"
                  className="mb-2"
                  id="prodDescription"
                  value={author || ''}
                  onInput={(e) => setAuthor(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Price</Label>
                <Input
                  type="number"
                  id="number"
                  className="mb-2"
                  value={price || ''}
                  onInput={(e) => setPrice(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>About Product</Label>
                <Input
                  type="textarea"
                  className="mb-2"
                  id="subject"
                  value={subject || ''}
                  onInput={(e) => setSubject(e.target.value)}
                />
              </FormGroup>

              <FormGroup className="col-lg-6 col-sm-12 col-md-6">
                <Label className="mt-2">Category</Label>
                <br />
                <Input
                  type="select"
                  name="category"
                  onChange={(e) => setFinalCat(e.target.value)}
                >
                  {categorydata.map((val) => {
                    return <option value={val.id}>{val.category_name}</option>;
                  })}
                </Input>
              </FormGroup>

              <FormGroup className="col-lg-6 col-sm-12 col-md-6">
                <Label className="mt-2">In Stock</Label>
                <br />
                <Input
                  type="select"
                  name="availability"
                  id="availability"
                  value={availability || ''}
                  onChange={(e) => setFinalCat(e.target.value)}
                >
                  <option value="1">available</option>
                  <option value="2">not available</option>
                </Input>
              </FormGroup>
            </div>
            <FormGroup className="d-flex justify-content-end">
              <Button color="primary" className="m-2">
                Save
              </Button>
              <Link to="/list">
                <Button color="primary" className="m-2">
                  Go back
                </Button>
              </Link>
            </FormGroup>
          </ModalBody>
        </Form>
      </Modal>
      <div className="text-center">
        {error ? <h1>Book Edited successfull</h1> : ''}
      </div>
    </div>
  );
}
export default EditBook;
