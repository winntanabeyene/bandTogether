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
      /**
       * Possible view values are:
       * 'home': Main view of the app
       * 'profile': Artist profile page
       * 'login': Login screen
       * 'register': Sign up screen
       * 'createprofile': Create/edit profile screen
       */
      view: 'home', 
      isLoggedIn: false,
      city: "",
      currentProfile: {},
      userProfile: {},
      searchCityValue: '',
      filters: {
        gig: false,
        fill: false,
        bandmates: false,
        member: false,
      },
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
    this.setSearchCityValue = this.setSearchCityValue.bind(this);
    this.filterListings = this.filterListings.bind(this);
  }

  /**
   * Sets the filter for the listings based on listing type.
   * 
   * @param {String} filterName The name of the filter to use.
   */
  setFilters(filterName) {
    const newFilters = Object.assign({}, this.state.filters);
    newFilters[filterName] = !this.state.filters[filterName];
    this.setState({
      filters: newFilters,
    })
    setTimeout(this.filterListings, 100);
  };

  /**
   * Filters the listings based on type.
   */
  filterListings() {
    let filteredListings;
    if(filterName) {
      newFilters[filterName] = !this.state.filters[filterName];
    }
    const {gig, fill, member, bandmates} = newFilters;
    if(!gig && !fill && !member && !bandmates) {
      filteredListings = this.state.listings;
    } else {
      filteredListings = this.state.listings.filter(listing => 
        (gig && listing.type === "Band for Gig") 
      || (fill && listing.type === "Band for Fill") 
      || (member && listing.type === "Band for Member") 
      || (bandmates && listing.type === "Musician for Band"))
    }
    if(this.state.searchCityValue) {
      const artistAddedListings = filteredListings.map(listing => {
        const listingArtist = this.state.artists.reduce((seed, artist) => artist.id === listing.artistId ? artist : seed);
        listing.city = listingArtist.city;
        return listing;
      })
      filteredListings = filteredListings.filter((listing, index) => artistAddedListings[index].city.toUpperCase() === this.state.searchCityValue.toUpperCase())
    }
    this.setState({
      filters: newFilters,
      filteredListings,
    })
  };

  setSearchCityValue(e, clearSearch = false) {
    if(clearSearch) {
      this.setState({searchCityValue: ''});
    } else {
      this.setState({searchCityValue: e.target.value});
    }
  }

  /**
   * On mount, the app checks the authentication status of the current user, 
   * finds listings and artists from the server,
   * then sets the listings on the state.
   */
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

  /**
   * Retrieves the listings and artist info from the server.
   */
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

  /**
   * Queries the server for the authentation status of the current user.
   */
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

  /**
   * Attempts to log in the user using the information they provided.
   * If successful, redirects the user to the 'home' view.
   * 
   * @param {Object} loginObj An object containing the attemped username and password that the user entered.
   */
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

  /**
   * Logs out the currently logged-in user.
   */
  handleLogout() {
    return axios.post('/logout')
      .then(() => {
        return this.checkAuth()
          .then(() => {
            this.changeView('login');
          })
      })
  }

  /**
   * Attempts to sign up the user with the information they provided. 
   * If successful, the user is redirected to the 'create profile' view to enter their profile information.
   * 
   * @param {Object} signupObj An object containing the signup information given by the user,
   */
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

  /**
   * Creates a listing based on the information given. 
   * 
   * @param {Object} newListing An object containing the info needed to make a new listing.
   */
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

  /**
   * Takes in information that the user wants to update and updates the corresponding profile.
   * 
   * @param {Object} profilePatch Profile information to be updated.
   */
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

  /**
   * Changes the currently selected profile in state.
   * 
   * @param {Object} profileObj An object containing profile information.
   */
  changeProfile(profileObj){
    this.setState({currentProfile: profileObj})
    this.changeView('profile');
  }

  /**
   * Changes the view of the app. 
   * 
   * @param {String} view A string representing the view.
   */
  changeView(view) {
    this.setState({
      view: view,
    })
  }
  
  render() {
    const {filteredListings, listings, artists, view, isLoggedIn, currentProfile, userProfile, filters, searchCityValue } = this.state
    return (
      <div className="container-fluid">
        <Navbar handleLogout={this.handleLogout} userProfile={userProfile} changeProfile={this.changeProfile} isLoggedIn={isLoggedIn} changeView={this.changeView} view={view} />
        <div className="row">
          <div className="col-md-12">
            {view === 'home' && <Home filters={filters} searchCityValue={searchCityValue} setSearchCityValue={this.setSearchCityValue} setFilters={this.setFilters} handleNewListing={this.handleNewListing} changeProfile={this.changeProfile} isLoggedIn={isLoggedIn} listings={filteredListings} artists={artists} />}
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