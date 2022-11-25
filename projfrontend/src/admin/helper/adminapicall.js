import { API } from '../../backend';

//Category Calls

//Create Category
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

// 5.GET: Get single Category
export const getCategory = (categoryId) => {
  return fetch(`${API}/category/${categoryId}`, {
    method: 'GET',
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Get All categories
export const getAllCategories = () => {
  return fetch(`${API}/categories`, {
    method: 'GET',
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Delete Category
export const deleteCategory = (categoryId, userId, token) => {
  return fetch(`${API}/category/delete/${categoryId}/${userId}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//Update Category

export const updateCategory = (categoryId, userId, token, category) => {
  return fetch(`${API}/category/update/${categoryId}/${userId}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: category,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//****  CRUD PRODUCT  ****//

//1 CREATE: Create Products calls

export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: 'POST',
    headers: {
      accept: 'application/json', // !Content-Type becoz Don't require data in json format
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

// 2.GETALL Get all Products calls

export const getAllProduct = (product) => {
  return fetch(`${API}/products`, {
    method: 'GET',
    body: product,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

// 3.DELETE: Delete Products calls

export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

// 4.UPDATE: Update all Products calls

export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

// 5.GET: Get single Products calls
export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: 'GET',
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
