import React from 'react';
import ListView from './ListView.jsx'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { listings, bands, musicians} = this.props;
    return (
      <div className="jumbotron">
        <div className="row">
          {/* <Search /> */}
          <div className="col-md-12">
            <div style={{ border: '1px solid red' }} className="container">
              <h2 className='text-center'>Search Component Here</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <ListView listings={listings} bands={bands} musicians={musicians} />
        </div>
      </div>
    )
  }
}


export default Home;
