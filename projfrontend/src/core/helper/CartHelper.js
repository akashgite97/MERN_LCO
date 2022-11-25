//Add Item to Cart
export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.push({
      ...item,
      count: 1,
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    next();
  }
};

//Load All cart items
export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart'));
    }
  }
};

//remove Cart Item
export const removeItemFromCart = (prodductId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.map((product, index) => {
      if (product._id === prodductId) {
        cart.splice(index, 1);
      }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  return cart;
};

//make cart empty after order(payment)

export const cartEmpty = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem('cart');
    next();
  }
};
