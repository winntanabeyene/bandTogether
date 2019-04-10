import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueCity: '',
      valueSearch: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(event) {
    const { id, value } = event.target;
    if (id === 'city') {
      this.setState({
        valueCity: value,
      });
    } else if (id === 'search') {
      this.setState({
        valueSearch: value,
      });
    }
  }

  handleCity(event) {
    const { valueCity } = this.state;
    console.log(valueCity);
    this.setState({
      valueCity: '',
    })
    // call a function to change currentCity state on home component
    event.preventDefault();
  }

  handleSearch(event) {
    const { valueSearch } = this.state;
    console.log(valueSearch);
    this.setState({
      valueSearch: '',
    })
    // call a function to search listings
    event.preventDefault();
  }

  render() {
    const { valueCity, valueSearch } = this.state;
    return (
      <div className="jumbotron bg-secondary"> 
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={this.handleCity}>
              <div className="row" style={{ justifyContent: 'center' }}>
                <input type="text" placeholder="Enter a City Name" id="city" value={valueCity} onChange={this.handleChange}></input>
                <button className="btn btn-sm btn-dark">Change City</button>
              </div>
            </form>
              <br />
            <form onSubmit={this.handleSearch}>
              <div className="row" style={{ justifyContent: 'center' }}>
                <input type="text" placeholder="Search Here" id="search" value={valueSearch} onChange={this.handleChange}></input>
                <button className="btn btn-sm btn-dark">Search</button>
              </div>
            </form>
          </div>
          <div className="col-md-8">
            <div className="row" style={{ justifyContent: 'center' }}>
              <h3>Filter By: </h3>
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className="btn btn-sm btn-dark">
                  <input type="checkbox" autoComplete="off" />Looking For Gig
                </label>
                <label className="btn btn-sm btn-dark">
                  <input type="checkbox" autoComplete="off" />Looking For Fill
                </label>
                <label className="btn btn-sm btn-dark">
                  <input type="checkbox" autoComplete="off" />Looking For Bandmates
                </label>
                <label className="btn btn-sm btn-dark">
                  <input type="checkbox" autoComplete="off" />Looking For Member
                </label>
              </div>
            </div>
            <br />
            <div className="row" style={{ justifyContent: 'center' }}>
              <h3>Sort By: </h3>
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className="btn btn-sm btn-dark">
                  <input type="radio" autoComplete="off" />Date
                </label>
                <label className="btn btn-sm btn-dark">
                  <input type="radio" autoComplete="off" />Genre
                </label>
                <label className="btn btn-sm btn-dark">
                  <input type="radio" autoComplete="off" />Band Name
                </label>
                <label className="btn btn-sm btn-dark">
                  <input type="radio" autoComplete="off" />Event Name
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
