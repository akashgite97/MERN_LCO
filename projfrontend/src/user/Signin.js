import React, { useState } from 'react';
import Base from '../core/Base';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate, isAutheticated } from '../auth/helper';

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const { user } = isAutheticated;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch(console.log('Sign in request failed'));
  };

  const prerformRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to='/admin/dashboard' />;
      } else {
        return <Redirect to='/user/dashboard' />;
      }
    }

    if (isAutheticated()) {
      return <Redirect to='/' />;
    }
  };

  const signInForm = () => {
    return (
      <div className='row '>
        <div className='col-md-6 offset-sm-3 text-left'>
          <form action=''>
            <div className='form-group'>
              <label className='text-light'>Email</label>
              <input
                type='email'
                className='form-control'
                onChange={handleChange('email')}
              ></input>
            </div>
            <div className='form-group'>
              <label className='text-light'>Password</label>
              <input
                type='password'
                className='form-control'
                onChange={handleChange('password')}
              ></input>
            </div>
            <button
              className='btn btn-success btn-block'
              type='submit'
              onClick={onSubmit}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className='alert alert-info'>
          <h2>Loaing</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-warning alert-dismissible fade show'
            role='alert'
            style={{ display: error ? '' : 'none' }}
          >
            {error}
            <button
              type='button'
              className='close'
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
    <Base title='Sign in page' description='A page for user to signin!'>
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {prerformRedirect()}
    </Base>
  );
};

export default Signin;
