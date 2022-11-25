import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import {
  createProduct,
  getAllCategories,
  getProduct,
  updateProduct,
} from './helper/adminapicall';

const UpdateProduct = ({ match }) => {
  const { user, token } = isAutheticated();

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

  //Get Product data to update
  const preload = (productId) => {
    getProduct(productId).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          stock: data.stock,
          formData: new FormData(),
        });
        preloadCategories();
      }
    });
  };

  //Get All Created Categories
  const preloadCategories = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    //Update Product
    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
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
        }
      }
    );
  };

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className='alert alert-success mt-3'
      style={{ display: createdProduct ? '' : 'none' }}
    >
      {createdProduct} updated successfully
    </div>
  );

  const errorMessage = () => {
    if (error) {
      return <h4 className='text-danger'>Failed to Updtate Product</h4>;
    }
  };

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
          name='photo'
          className='form-control'
          placeholder='Name'
          value={name}
        />
      </div>
      <div className='form-group'>
        <textarea
          onChange={handleChange('description')}
          name='photo'
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
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title='Update Products Here!'
      description='Welcome to product update section'
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

export default UpdateProduct;
