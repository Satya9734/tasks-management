import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo.png';
import defaultAvatar from './avatar.png';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = () => {
  const userName = useSelector((state) => state.tasks.name)||localStorage.getItem("name");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        {/* <div className="sidebar-header">
          <img src={logo} alt="Logo" className="logo" />
          <span className="app-title">Task Manager</span>
          <div className="menu-close" onClick={toggleMenu}>
            <FaTimes />
          </div>
        </div> */}
        {/* <img src={logo} alt="Logo" className="logo" /> */}

        <nav className="sidebar-links">
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          <NavLink to="/dashbord" onClick={() => setIsMenuOpen(false)}>Dashbord</NavLink>
          <NavLink to="/complete" onClick={() => setIsMenuOpen(false)}>Complete Tasks</NavLink>
          <NavLink to="/pending" onClick={() => setIsMenuOpen(false)}>Pending Tasks</NavLink>
          <NavLink to="/note/save" onClick={() => setIsMenuOpen(false)}>Save Note</NavLink>
          <NavLink to="/note/show" onClick={() => setIsMenuOpen(false)}>Show Notes</NavLink>
          <NavLink to="/user" onClick={() => setIsMenuOpen(false)}>User</NavLink>
          <NavLink to="/user/logout" onClick={() => setIsMenuOpen(false)}>Log out</NavLink>
          
        </nav>

        <div className="sidebar-profile">
          <img src={defaultAvatar} alt="Profile" className="profile-pic" />
          <span className="user-name">{userName}</span>
        </div>
      </div>

      {/* Toggle button for small screens */}
      <div className="menu-button" onClick={toggleMenu}>
        <FaBars />
      </div>
    </>
  );
};

export default Nav;
