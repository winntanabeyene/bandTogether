import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
