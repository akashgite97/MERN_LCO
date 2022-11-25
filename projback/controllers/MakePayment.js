const stripe = require('stripe')(
  'sk_test_51HH60REeLtDM76P9AJ1PlUO5yERdv10bz9hAvko4w3s6XH6qBdxkHcz1mFNzepSctzpqm2DDvVEB9xVeDBKFzEN700ZDWXKL5A'
);
const { response } = require('express');
const { result } = require('lodash');
const uuid = require('uuid/v4');

exports.MakePayment = (req, res) => {
  const { products, token } = req.body;
  console.log(products);

  let amount = 0;
  products.map((p) => (amount = amount + p.price));

  const idempotencyKey = uuid(); //responsible for not charging user again

  //Create customer and charge
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: 'a test account',

            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line1,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          { idempotencyKey }
        )
        .then((result) => res.status(200).json(result))
        .catch((error) => console.log(error));
    });
};
