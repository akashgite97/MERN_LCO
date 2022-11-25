import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import {
  createCategory,
  getCategory,
  updateCategory,
} from './helper/adminapicall';

const UpdateCategory = ({ match }) => {
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
          <p className='lead'>Update the category</p>
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
            Update category
          </button>
        </div>
      </form>
    );
  };

  const handleChange = (event) => {
    setError('');
    setName(event.target.value);
  };

  //Get single category

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        console.log(data.error);
        setError(true);
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    //Backend req fired
    updateCategory(match.params.categoryId, user._id, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError('');
        setName('');
        setSuccess(true);
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className='text-success'>{name} created successfully</h4>;
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
export default UpdateCategory;
