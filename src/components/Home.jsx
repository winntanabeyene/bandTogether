import React from 'react';

import Search from './Search.jsx';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Used to filter out listings by type
      filter: '',
      // Used to sort listings
      sort: '',
    };
  }

  render() {
    return (
      <div className="jumbotron">
        <div className="row">
          <div className="col-md-12">
            <Search />
          </div>
        </div>
        <div className="row">
          {/* <Listings /> */}
          <div className="col-md-12">
            <div style={{ border: '1px solid red' }} className="container">
              <h2 className='text-center'>Listings Component Here</h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Home;
