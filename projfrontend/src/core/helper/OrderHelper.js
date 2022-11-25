const { API } = require('../../backend');

export const createOrder = (userId, token, orderData) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Beaere ${token}`,
    },
    body: JSON.stringify({ order: orderData }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
