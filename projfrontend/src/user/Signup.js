import React, { useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: '',
            email: '',
            password: '',
            error: '',
            success: true,
          });
        }
      })
      .catch(console.log('Error in signup'));
  };

  const signUpForm = () => {
    return (
      <div className='row '>
        <div className='col-md-6 offset-sm-3 text-left'>
          <form action=''>
            <div className='form-group'>
              <label className='text-light'>Name</label>
              <input
                type='text'
                className='form-control'
                onChange={handleChange('name')}
                value={name}
              ></input>
            </div>
            <div className='form-group'>
              <label className='text-light'>Email</label>
              <input
                type='email'
                className='form-control'
                onChange={handleChange('email')}
                value={email}
              ></input>
            </div>
            <div className='form-group'>
              <label className='text-light'>Password </label>
              <input
                type='password'
                className='form-control'
                onChange={handleChange('password')}
                value={password}
              ></input>
            </div>
            <button
              className='btn btn-success btn-block'
              type='submit'
              onClick={onSubmit}
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-success'
            style={{ display: success ? '' : 'none' }}
          >
            New account created successfully.Please
            <Link to='/signin'>Log in here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            class='alert alert-warning alert-dismissible fade show'
            role='alert'
            style={{ display: error ? '' : 'none' }}
          >
            {error}
            <button
              type='button'
              class='close'
              data-dismiss='alert'
              aria-label='Close'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base
      title='Sign up page'
      description='A page for user to signup!'
      className=''
    >
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      {/*<p className='text-white text-center'>{JSON.stringify(values)}</p>*/}
    </Base>
  );
};

export default Signup;
