import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { authUser } from "./Context";

function Navbar() {
      
  // use context 
  let user = authUser()
  console.log('user in navbar',user);
  let {condata} = user

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-success">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          <img src="https://cdn-icons-png.flaticon.com/128/3649/3649281.png" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
           
         {
          condata.isLoggedIn===false ?
          <li className="nav-item">
              <NavLink to="/">Login</NavLink>
            </li>
            :
            ''
         }

           {
            condata.isLoggedIn===false ?
            <li className="nav-item">
              <NavLink to="/register">Register</NavLink>
            </li>
            :
            ''
           }
            
           {
            condata.isLoggedIn===true ?
            <li className="nav-item">

            <NavLink to="/dashboard">Dashboard</NavLink>

            </li>
            :
            ''
           }
           {
            condata.isLoggedIn===true ?
            <li className="nav-item">

            <NavLink to="/Store">Store</NavLink>

            </li>
            :
            ''
           }

           {
            condata.isLoggedIn===true  ?
            (
              <li className="nav-item">
              <div className="dropdown">
                <button
                  className="btn btn-info dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                {user?.condata?.userName}
                </button>
                <ul
                  className="dropdown-menu ">
                    <li className=""><button
                    onClick={user.logout}
                     className="btn btn-danger w-100">LOGOUT</button></li>
                  </ul>
              </div>
            </li>
            )
            :
            ''
           }

           
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
