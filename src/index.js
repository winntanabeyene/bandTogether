import React from 'react';
import ReactDOM from 'react-dom';
import Favicon from 'react-favicon';

import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import listings from '../mockData/listing';
import accounts from '../mockData/account';
import bands from '../mockData/band';
import instruments from '../mockData/instrument';
import musicians from '../mockData/musician';
import profiles from '../mockData/musician';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {listings, accounts, bands, instruments, musicians, profiles };
    
  }

  render() {
    const {listings, bands, musicians} = this.state
    return (
      <div className="container-fluid">
        <Navbar />
        <div className="row">
          <div className="col-md-12">
            <Home listings={listings} bands={bands} musicians={musicians}/>
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