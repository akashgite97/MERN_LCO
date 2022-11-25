import { data } from 'jquery';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAutheticated();

  //Button to go back admin dashboard
  const goBack = () => (
    <div className='mt-5'>
      <Link className='btn btn-sm btn-info mb-3' to='/admin/dashboard'>
        Admin Home
      </Link>
    </div>
  );

  //Category Form
  const myCategoryForm = () => {
    return (
      <form>
        <div className='form-group'>
          <p className='lead'>Enter the category</p>
          <input
            type='text'
            className='form-control my-3'
            autoFocus
            required
            placeholder='For Ex.Summer'
            onChange={handleChange}
            value={name}
          />
          <button className='btn btn-outline-info' onClick={onSubmit}>
            Create category
          </button>
        </div>
      </form>
    );
  };

  const handleChange = (event) => {
    setError('');
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);

    //Backend req fired
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError('');
        setSuccess(true);
        setName('');
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className='text-success'>Category created successfully</h4>;
    }
  };

  const errorMessage = () => {
    if (error) {
      return <h4 className='text-danger'>Failed to create category</h4>;
    }
  };

  return (
    <Base
      title='Create a Category'
      description='Add new category for new t-shirts'
      className='container bg-info p-4'
    >
      <div className='row bg-white rounded'>
        <div className='col-md-8 offser-md-2'>
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};
export default AddCategory;
