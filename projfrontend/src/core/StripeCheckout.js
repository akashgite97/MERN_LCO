import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/CartHelper';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API } from '../backend';
import { createOrder } from './helper/OrderHelper';

const StripeCheckout = ({
  products,
  setreload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: '',
    address: '',
  });

  //Grab token n userId from isAuth
  const token = isAutheticated() && isAutheticated().token;
  const userId = isAutheticated() && isAutheticated().user._id;

  const getFinalTotal = () => {
    let amount = 0;
    products.map((p) => (amount = amount + p.price));
    return amount;
  };

  //Backend request fro makePayents
  const makePayment = (token) => {
    const body = {
      token,
      products,
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    return fetch(`${API}/stripepayment`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log(res);
        const { status } = res;
        console.log('STATUS', status);
        cartEmpty(); //after payment clear cart
      })
      .catch((error) => console.log(error));
  };

  const showStripeButton = () => {
    return isAutheticated() ? (
      <StripeCheckoutButton
        stripeKey='pk_test_51HH60REeLtDM76P9s4dxV2fC3o0Tc9ClD5B7PyUduwRLIPZ8EhwZQNENpkoYQ6Mj6sn5bcUi02zQ9WaJRor7la1X00XqjnHt0Z'
        token={makePayment}
        amount={getFinalTotal() * 100} //Multiply hundred to chare user in dollser(cents to doller)
        name='Buy T-shirt'
        shippingAddress
        billingAddress
      >
        <button className='btn btn-success offset-1'>Pay with Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to='/signin'>
        <button className='btn btn-warning offset-1'>signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h2 className='text-white'>Stripe CheckOut {getFinalTotal()}</h2>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
