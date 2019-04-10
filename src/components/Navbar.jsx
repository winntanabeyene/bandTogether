import React from 'react';

const Navbar = (props) => {
  const { changeView } = props;
  return (
    <div>
      <nav className="navbar fixed-top navbar-dark bg-dark">
        <a href="#!" onClick={() => {changeView('home')}} className="navbar-brand">Band Together</a>

        <ul className="nav nav-pills">
          <li className="nav-item">
          {/* When these links are clicked, it should change the view on the state, changing the view that is rendered*/}
            <a className="nav-link text-light" onClick={() => {changeView('home')}} href="#!">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" onClick={() => {changeView('profile')}} href="#!">Profile</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" onClick={() => { changeView('login') }} href="#!">Login</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar;
