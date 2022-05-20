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
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, FormGroup, Button, Input, Spinner, FormText } from 'reactstrap';
import './App.css';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    async onSubmit(values) {
      await axios
        .post('/users/login', {
          username: values.username,
          password: values.password,
        })
        .then((response) => {
          localStorage.setItem('regtoken', JSON.stringify(response.data.token));
          localStorage.setItem(
            'regtoken user',
            JSON.stringify(response.data.userOb)
          );
          document.querySelector('#list').style.display = 'block';
          document.querySelector('#login-btn').style.display = 'none';
          document.querySelector('#logout-btn').style.display = 'inline';
          alert('Login successfull');
          navigate('/');
        })
        .catch((errors) => {
          console.log(errors.response.data.error);
          setError(errors.response.data.error);
        });
    },
    validate() {
      const errors = {};
      if (formik.values.password.length < 6) {
        errors.password = "Can't be less than 6 characters";
      }
      if (formik.values.username.length < 3) {
        errors.username = "Can't be less than 3 characters";
      }
      return errors;
    },
  });
  return (
    <div className="login-container text-center d-flex flex-column justify-content-center align-items-center">
      <Form
        onSubmit={formik.handleSubmit}
        noValidate
        className="login-form-container"
      >
        <h1 className="login-heading mb-2">Login</h1>
        <FormGroup>
          <Input
            type="text"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder="Enter username"
            className="mb-2"
            invalid={formik.errors.username && formik.touched.username}
            required
          />
          {formik.touched.username && formik.errors.username && (
            <FormText color="danger">{formik.errors.username}</FormText>
          )}
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Enter password"
            className="mb-2"
            invalid={formik.errors.password && formik.touched.password}
            required
          />
          {formik.touched.password && formik.errors.password && (
            <FormText color="danger">{formik.errors.password}</FormText>
          )}
        </FormGroup>
        <FormGroup className="text-right">
          <Button color="primary" type="submit" className="w-50 mb-2">
            Login
          </Button>
        </FormGroup>
        <div className="text-center">
          <div id="error-status" className="text-center text-danger">
            <p>{error}</p>
          </div>
        </div>
      </Form>
    </div>
  );
}
