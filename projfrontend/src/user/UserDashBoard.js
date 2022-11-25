import React from 'react';
import Base from '../core/Base';
import { isAutheticated } from '../auth/helper';

const UserDashboard = () => {
  const {
    user: { name, email, role },
  } = isAutheticated();
  return (
    <Base title='User Dashboard' description='User Info'>
      <span className='badge badge-success mr-2'>Email: </span>

      {email}
      <br></br>
      <span className='badge badge-success mr-2'>Name: </span>
      {name}
    </Base>
  );
};

export default UserDashboard;
