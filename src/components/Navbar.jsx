import React from 'react';



const Navbar = (props) => {
  const { changeView, view, isLoggedIn, handleLogout, userProfile, changeProfile } = props;
  return (
    <div>
      <nav className="navbar fixed-top navbar-dark bg-dark">
        <a href="#!" onClick={() => {changeView('home')}} className="navbar-brand">Band Together</a>
        <div className="dropdown show">
          <a className="btn btn-secondary dropdown-toggle" href="#!" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {view !== 'createprofile' && view[0].toUpperCase() + view.slice(1)}
            {view === 'createprofile' && "Create Profile"}
            </a>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a className="dropdown-item" onClick={() => { changeView('home') }} href="#!">Home</a>
            <a className="dropdown-item" onClick={() => { changeView('profile'); changeProfile(userProfile); }} href="#!">Profile</a>
            {!isLoggedIn && <a className="dropdown-item" onClick={() => { changeView('login') }} href="#!">Login</a>}
            {isLoggedIn && <a className="dropdown-item" onClick={handleLogout} href="#!">Logout</a>}
          </div>
        </div>  
      </nav>
    </div>
  )
}

export default Navbar;
