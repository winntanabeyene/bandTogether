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
import listings from '../mockData/listing';
import artists from '../mockData/artist';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: artists,
      listings: listings,
      view: 'home', 
    };
    
    this.changeView = this.changeView.bind(this);
  }

  componentDidMount(){
    axios.get('/listings')
    .then((listings) => {
      console.log(listings.data)
      this.setState({listings: listings.data})
    })
    .then (()=> {
      axios.get('/artist')
      .then((artists)=> {
        console.log(artists.data);
        this.setState({artists: artists.data})
      })
    })
      .catch((err) => {
      console.error(err)
    });
  }

  changeView(view) {
    this.setState({
      view: view,
    })
  }

  render() {
    const {listings, artists, accounts, view} = this.state
    return (
      <div className="container-fluid">
        <Navbar changeView={this.changeView} view={view} />
        <div className="row">
          <div className="col-md-12">
            {view === 'home' && <Home listings={listings} artists={artists} accounts={accounts}/>}
            {view === 'profile' && <Profile changeView={this.changeView} listings={listings} artists={artists} accounts={accounts} />}
            {view === 'login' && <Login changeView={this.changeView} />}
            {view === 'register' && <Register changeView={this.changeView}/>}
            {view === 'createprofile' && <CreateProfile changeView={this.changeView} />}
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