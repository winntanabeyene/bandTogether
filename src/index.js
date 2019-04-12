import React from 'react';
import ReactDOM from 'react-dom';
import Favicon from 'react-favicon';
import axios from 'axios';

import Navbar from './components/Navbar.jsx';
import Profile from './components/Profile.jsx'
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx'
import listings from '../mockData/listing';
import artists from '../mockData/artist';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: artists,
      listings: listings,
      view: 'home', 
      isLoggedIn: false,
    };
    
    this.changeView = this.changeView.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount(){
    return this.checkAuth()
      .then(() => {
        return axios.get('/artist')
          .then((artists)=> { this.setState({artists: artists.data}) })
          .then(() => {
            return axios.get('/listings')
            .then((listings) => { this.setState({listings: listings.data}) })
          })
            .catch((err) => {
            console.error(err)
          });
      })
  }

  checkAuth() {
    return axios.get('/checkauth')
    .then((response) => {
      if (response.data) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    })
  }

  handleLogin(loginObj) {
    return axios.post('/login', loginObj)
      .then((response) => {
        const info = response.data;
        if (info === 'Logged in!') {
          return this.checkAuth()
            .then(() => {
              this.changeView('home');
            })
        } else if (info === 'Failed to log in') {
          const error = { info: 'Failed to log in' };
          throw error;
        }
      })
  }

  handleLogout() {
    return axios.post('/logout')
      .then(() => {
        return this.checkAuth()
          .then(() => {
            this.changeView('login');
          })
      })
  }

  changeView(view) {
    this.setState({
      view: view,
    })
  }

  render() {
    const {listings, artists, view, isLoggedIn} = this.state
    return (
      <div className="container-fluid">
        <Navbar handleLogout={this.handleLogout} isLoggedIn={isLoggedIn} changeView={this.changeView} view={view} />
        <div className="row">
          <div className="col-md-12">
            {view === 'home' && <Home isLoggedIn={isLoggedIn} listings={listings} artists={artists} />}
            {view === 'profile' && <Profile isLoggedIn={isLoggedIn} listings={listings} artists={artists} />}
            {view === 'login' && <Login isLoggedIn={isLoggedIn} handleLogin={this.handleLogin} changeView={this.changeView} />}
            {view === 'register' && <Register isLoggedIn={isLoggedIn} changeView={this.changeView}/>}
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
<div>
    <Favicon url="http://www.iconj.com/ico/k/y/ky8gheq1tw.ico" type="image/x-icon"/>
  <App />
</div>, document.getElementById('app'));