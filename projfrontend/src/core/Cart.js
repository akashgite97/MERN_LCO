import React, { useState, useEffect } from 'react';
import '../App.css';
import { API } from '../backend';
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/CartHelper';
import StripeCheckout from './StripeCheckout';

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>This Section is to load products</h2>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addToCart={false}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2>This Section for checkout</h2>
      </div>
    );
  };

  return (
    <Base title='Cart Page' description='Ready to CheckOut'>
      <div className='container'>
        <div className='row '>
          <div className='col-6'>{loadAllProducts()}</div>
          <div className='col-6'>
            <StripeCheckout products={products} setReload={setReload} />
          </div>
        </div>
      </div>
    </Base>
  );
}
