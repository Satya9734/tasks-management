import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo.png'; // Replace with your logo path

const Nav = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <span className="app-title">Task Manager</span>
      </div>
      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink>
        <NavLink to="/dashbord" className={({ isActive }) => isActive ? 'active-link' : ''}>Dashbord</NavLink>
        <NavLink to="/addtask" className={({ isActive }) => isActive ? 'active-link' : ''}>Add Task</NavLink>
        <NavLink to="/alltasks" className={({ isActive }) => isActive ? 'active-link' : ''}>All Tasks</NavLink>
        <NavLink to="/complete" className={({ isActive }) => isActive ? 'active-link' : ''}>Complete Tasks</NavLink>
        <NavLink to="/pending" className={({ isActive }) => isActive ? 'active-link' : ''}>Pending Tasks</NavLink>
        <NavLink to="/user" className={({ isActive }) => isActive ? 'active-link' : ''}>User</NavLink>
        <NavLink to="/user/logout" className={({ isActive }) => isActive ? 'active-link' : ''}>Log out</NavLink>

      </div>
    </div>
  );
};

export default Nav;
