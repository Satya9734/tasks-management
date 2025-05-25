import React from 'react';
import { Outlet } from 'react-router-dom';
import Foot from '../base/Foot';

function User() {
  return (
    <div className="userContainer">
      <div className="userContent">
        <Outlet />
      </div>
      <Foot />
    </div>
  );
}

export default User;
