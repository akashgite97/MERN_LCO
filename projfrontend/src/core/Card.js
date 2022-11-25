import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/CartHelper';
import ImageHelper from './helper/ImageHelper';

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  //function f retuns f
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const CardTitle = product ? product.name : 'A photo from pixels';
  const CardDescription = product ? product.description : 'Default Description';
  const CardPrice = product ? product.price : 'Default';

  addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  //Redirect method to cart
  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={addToCart}
          className='btn btn-block btn-outline-success mt-2 mb-2'
        >
          Add to Cart
        </button>
      )
    );
  };
  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(true);
          }}
          className='btn btn-block btn-outline-danger mt-2 mb-2'
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className='card text-white bg-dark border border-info text-center '>
      <div className='card-header lead'>{CardTitle}</div>
      <div className='card-body'>
        {getRedirect(redirect)}
        <ImageHelper product={product} /> {/* Display Product Image */}
        <p className='lead bg-success font-weight-normal text-wrap'>
          {CardDescription}
        </p>
        <p className='btn btn-success rounded  btn-sm px-4'>$ {CardPrice}</p>
        <div className='row'>
          <div className='col-12'>{showAddToCart(addToCart)}</div>
          <div className='col-12'>{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
