import React from 'react';
import ListView from './ListView.jsx'

import Search from './Search.jsx';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Used to filter out listings by type
      filterGig: false,
      filterBand: false,
      filterMates: false,
      filterMember: false,
      // Used to sort listings
      sort: '',
    };
  }


  render() {
    const { listings, artists, accounts} = this.props;
    return (
      <div className="jumbotron">
        <div className="row">
          <div className="col-md-12">
            <Search />
          </div>
        </div>
        <div className="row">
          <ListView listings={listings} artists={artists}/>
        </div>
      </div>
    )
  }
}


export default Home;
