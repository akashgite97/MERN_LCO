import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAutheticated, signout, signin } from '../auth/helper';

//Change Menu Item Style
//Des: history.location.pathname contain URL visited by user
const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#2ecc72 ' };
  } else {
    return { color: '#fff' };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className='nav nav-tabs bg-dark'>
        <li className='nav-item'>
          <Link style={currentTab(history, '/')} to='/' className='nav-link'>
            Home
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            style={currentTab(history, '/cart')}
            to='/cart'
            className='nav-link'
          >
            Cart
          </Link>
        </li>
        {isAutheticated() && isAutheticated().user.role === 0 && (
          <li className='nav-item'>
            <Link
              style={currentTab(history, '/user/dashboard')}
              to='/user/dashboard'
              className='nav-link'
            >
              User DashBoard
            </Link>
          </li>
        )}
        {isAutheticated() && isAutheticated().user.role === 1 && (
          <li className='nav-item'>
            <Link
              style={currentTab(history, '/admin/dashboard')}
              to='/admin/dashboard'
              className='nav-link'
            >
              Admin Dashboard
            </Link>
          </li>
        )}
        {!isAutheticated() && (
          <Fragment>
            <li className='nav-item'>
              <Link
                style={currentTab(history, '/signup')}
                to='/signup'
                className='nav-link'
              >
                Sign Up
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                style={currentTab(history, '/signin')}
                to='/signin'
                className='nav-link'
              >
                Sign In
              </Link>
            </li>
          </Fragment>
        )}
        {isAutheticated() && (
          <li className='nav-item ml-auto mr-2'>
            <span
              className='nav-link text-warning'
              onClick={() => {
                signout(() => {
                  history.push('/');
                  {
                    /*Signout User and redirect to home page*/
                  }
                });
              }}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
