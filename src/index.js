import React from 'react';
import ReactDOM from 'react-dom';
import Favicon from 'react-favicon';

import Navbar from './components/Navbar.jsx';
import Profile from './components/Profile.jsx'
import Home from './components/Home.jsx';
import listings from '../mockData/listing';
import accounts from '../mockData/account';
import bands from '../mockData/band';
import instruments from '../mockData/instrument';
import musicians from '../mockData/musician';
import profiles from '../mockData/profile';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings, 
      accounts, 
      bands, 
      instruments, 
      musicians, 
      profiles,
      view: 'home', 
    };
    
    this.changeView = this.changeView.bind(this);
  }

  changeView(view) {
    this.setState({
      view: view,
    })
  }

  render() {
    const {listings, bands, musicians, view} = this.state
    return (
      <div className="container-fluid">
        <Navbar changeView={this.changeView} />
        <div className="row">
          <div className="col-md-12">
            {view === 'home' && <Home listings={listings} bands={bands} musicians={musicians}/>}
            {view === 'profile' && <Profile data={this.state} />}
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