import React from 'react';
import ReactDOM from 'react-dom';
import Favicon from 'react-favicon';
import axios from 'axios';

import Navbar from './components/Navbar.jsx';
import Profile from './components/Profile.jsx'
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx'
import CreateProfile from './components/CreateProfile.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      listings: [],
      filteredListings: [],
      view: 'home', 
      isLoggedIn: false,
      city: "",
      currentProfile: {},
      userProfile: {},
      filters: {
        gig: false,
        fill: false,
        bandmates: false,
        member: false,
      }
    };
    
    this.changeView = this.changeView.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
    this.getListings = this.getListings.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleNewListing = this.handleNewListing.bind(this);
    this.handlePatchProfile = this.handlePatchProfile.bind(this);
    this.changeProfile = this.changeProfile.bind(this);
    this.setFilters = this.setFilters.bind(this);
    this.filterListings = this.filterListings.bind(this);
    setTimeout(() => {console.log(this.state.listings.map(listing => listing.type))}, 500);
  }

  setFilters(filterName) {
    const newFilters = Object.assign({}, this.state.filters);
    newFilters[filterName] = !this.state.filters[filterName];
    this.setState({
      filters: newFilters,
    })
    setTimeout(this.filterListings, 100);
    console.log(this.state.filters)
  };

  filterListings() {
    let filteredListings;
    const {gig, fill, member, bandmates} = this.state.filters;
    if(!gig && !fill && !member && !bandmates) {
      filteredListings = this.state.listings;
    } else {
      filteredListings = this.state.listings.filter(listing => (gig && listing.type === "Band for Gig") 
      || (fill && listing.type === "Band for Fill") 
      || (member && listing.type === "Band for Member") 
      || (bandmates && listing.type === "Musician for Band"))
    }
    this.setState({filteredListings});
  }

  componentDidMount(){
    return this.checkAuth()
      .then(() => {
        return this.getListings();
      })
      .then(() => {
        return this.setState({filteredListings: this.state.listings})
      })
      .catch((error) => {
        console.error(error);
      })
  }

  getListings() {
    return axios.get('/artist')
      .then((artists)=> { this.setState({artists: artists.data, }) })
      .then(() => {
        return axios.get('/listings')
        .then((listings) => this.setState({listings: listings.data}));
      })
        .catch((err) => {
        console.error(err)
      });
  }

  checkAuth() {
    return axios.get('/checkauth')
    .then((response) => {
      if (response.data) {
        this.setState({ 
          isLoggedIn: true,
          currentProfile: response.data,
          userProfile: response.data,
        });
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

  handleSignup(signupObj) {
    return axios.post('/signup', signupObj)
      .then((response) => {
        const info = response.data;
        if (info === 'success') {
          return this.checkAuth()
            .then(() => {
              this.changeView('createprofile');
            })
        } else {
          const error = { info: 'Failed to sign up'};
          throw error;
        }
      })
  }

  handleNewListing(newListing) {
    return axios.post('/listings', newListing)
      .then((response) => {
        if (response.status !== 201) {
          const error = { info: response.data };
          throw error;
        } else {
          return this.getListings()
          .then(() => {
            return this.setState({filteredListings: this.state.listings})
          });
        }
      })
  }

  handlePatchProfile(profilePatch){
    const { userProfile } = this.state;
    return axios.patch('/artist', profilePatch)
    .then ((response) => {
      if (response.status !== 201) {
          const error = { info: response.data };
          throw error;
      } else {
        return axios.get(`/artist/${userProfile.name}`)
        .then((profile) => {
          this.setState({currentProfile: profile.data, userProfile: profile.data})
          
        })
      }
    })
  }

  changeProfile(currentProfile){
    this.setState({currentProfile: currentProfile})
    this.changeView('profile');
  }

  changeView(view) {
    this.setState({
      view: view,
    })
  }
  
  render() {
    const {filteredListings, listings, artists, view, isLoggedIn, currentProfile, userProfile} = this.state
    return (
      <div className="container-fluid">
        <Navbar handleLogout={this.handleLogout} userProfile={userProfile} changeProfile={this.changeProfile} isLoggedIn={isLoggedIn} changeView={this.changeView} view={view} />
        <div className="row">
          <div className="col-md-12">
            {view === 'home' && <Home setFilters={this.setFilters} handleNewListing={this.handleNewListing} changeProfile={this.changeProfile} isLoggedIn={isLoggedIn} listings={filteredListings} artists={artists} />}
            {view === 'profile' && <Profile changeView={this.changeView} isLoggedIn={isLoggedIn} listings={listings} artists={artists} userProfile={userProfile} currentProfile={currentProfile} />}
            {view === 'login' && <Login isLoggedIn={isLoggedIn} handleLogin={this.handleLogin} changeView={this.changeView} />}
            {view === 'register' && <Register handleSignup={this.handleSignup} isLoggedIn={isLoggedIn} changeView={this.changeView}/>}
            {view === 'createprofile' && <CreateProfile changeView={this.changeView} handlePatchProfile={this.handlePatchProfile} changeProfile={this.changeProfile} />}
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