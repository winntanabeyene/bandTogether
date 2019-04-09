import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    return (
      <div style={{ border: '1px solid red' }} className="jumbotron"> 
        <div className="row">
          <div className="col-md-4">
            <form>
              <div className="row" style={{ justifyContent: 'center' }}>
                <input type="text"></input>
                <button className="btn btn-dark">Change City</button>
              </div>
              <br />
              <div className="row" style={{ justifyContent: 'center' }}>
                <input type="text"></input>
                <button className="btn btn-dark">Search</button>
              </div>
            </form>
          </div>
          <div className="col-md-8">
            <div className="row" style={{ justifyContent: 'center' }}>
              <h3>Filter By: </h3>
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className="btn btn-secondary active">
                  <input type="checkbox" />Looking 4 Gig
                </label>
                <label className="btn btn-secondary active">
                  <input type="checkbox" />Looking 4 Band
                </label>
                <label className="btn btn-secondary active">
                  <input type="checkbox" />Looking 4 Bandmates
                </label>
                <label className="btn btn-secondary active">
                  <input type="checkbox" />Looking 4 Musicians
                </label>
              </div>
            </div>
            <br />
            <div className="row" style={{ justifyContent: 'center' }}>
              <h3>Sort By: </h3>
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className="btn btn-secondary active">
                  <input type="radio" />Date
                </label>
                <label className="btn btn-secondary active">
                  <input type="radio" />Genre
                </label>
                <label className="btn btn-secondary active">
                  <input type="radio" />Band Name
                </label>
                <label className="btn btn-secondary active">
                  <input type="radio" />Event Name
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Search;
