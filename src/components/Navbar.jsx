import React from 'react';

const Navbar = (props) => {
  return (
    <div>
      <nav className="navbar fixed-top navbar-dark bg-dark">
        <a href="#!" className="navbar-brand">Band Together</a>

        <ul className="nav nav-pills">
          <li className="nav-item">
          {/* When these links are clicked, it should change the view on the state, changing the view that is rendered*/}
            <a className="nav-link text-light" href="#!">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="#!">Profile</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar;
