import { API } from '../../backend';
//API Means: http://localhost:8000/api/

//Signn Up AUth
export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

//Signn in AUth
export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

//Set Token in user browser
export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    //Window object accesuble to us
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
};

//Sign Out Auth
export const signout = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
    next();
    return fetch(`${API}/signout`, {
      method: 'GET',
    })
      .then((res) => console.log('Signout Successfully'))
      .catch((error) => console.log(error));
  }
};

//Check user is sign or not
export const isAutheticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt')); //check Token
  } else {
    return false;
  }
};
