import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import { createProduct, getAllCategories } from './helper/adminapicall';

const AddProduct = () => {
  const { user, token } = isAutheticated();

  const history = useHistory();

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    photo: '',
    categories: [],
    category: '',
    loading: false,
    error: '',
    createdProduct: '',
    getRedirect: false,
    formData: '',
  });

  const {
    name,
    description,
    price,
    stock,
    category,
    categories,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  //Preload Data

  const preload = () => {
    getAllCategories().then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          price: '',
          photo: '',
          stock: '',
          loading: false,
          createdProduct: data.name,
        });
        setTimeout(() => {
          history.push('/');
        }, 3000);
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value; //if value (name)  is image
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className='alert alert-success mt-3'
      style={{ display: createdProduct ? '' : 'none' }}
    >
      {createdProduct} created successfully
    </div>
  );

  const errorMessage = () => (
    <div
      className='alert alert-danger mt-3'
      style={{ display: createdProduct ? '' : 'none' }}
    >
      {createdProduct}
    </div>
  );

  const createProductForm = () => (
    <form className='mt-3'>
      <span>Post photo</span>
      <div className='form-group'>
        <label className='btn btn-block btn-success'>
          <input
            onChange={handleChange('photo')}
            type='file'
            name='photo'
            accept='image'
            placeholder='choose a file'
          />
        </label>
      </div>
      <div className='form-group'>
        <input
          onChange={handleChange('name')}
          name='name'
          className='form-control'
          placeholder='Name'
          value={name}
        />
      </div>
      <div className='form-group'>
        <textarea
          onChange={handleChange('description')}
          name='description'
          className='form-control'
          placeholder='Description'
          value={description}
        />
      </div>
      <div className='form-group'>
        <input
          onChange={handleChange('price')}
          type='number'
          className='form-control'
          placeholder='Price'
          value={price}
        />
      </div>
      <div className='form-group'>
        <select
          onChange={handleChange('category')}
          className='form-control'
          placeholder='Category'
        >
          <option>Select</option>
          {categories &&
            categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className='form-group'>
        <input
          onChange={handleChange('stock')}
          type='number'
          className='form-control'
          placeholder='Quantity'
          value={stock}
        />
      </div>

      <button
        type='submit'
        onClick={onSubmit}
        className='btn btn-outline-success mb-3'
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title='Add Products Here!'
      description='Welcome to product creation section'
      className='container bg-info p-4'
    >
      <Link className='btn btn-md btn-dark mb-3 ' to='/admin/dashboard'>
        Admin Home
      </Link>
      <div className='row bg-dark text-white rounded'>
        <div className='col-md-8 offset-md-2'>
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
