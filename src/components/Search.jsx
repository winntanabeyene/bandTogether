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

    // sets up the filterByBar so that it shades the correct filter buttons on render
    this.gig = `btn btn-sm btn-dark${this.props.filters.gig ? ' active' : ''}`;
    this.fill = `btn btn-sm btn-dark${this.props.filters.fill ? ' active' : ''}`;
    this.bandmates = `btn btn-sm btn-dark${this.props.filters.bandmates ? ' active' : ''}`;
    this.member = `btn btn-sm btn-dark${this.props.filters.member ? ' active' : ''}`;
    this.filterByBar = (
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className={this.gig} onClick={() => {this.props.setFilters("gig")}}>
            <input type="checkbox" autoComplete="off" />Looking For Gig
          </label>
          <label className={this.fill} onClick={() => {this.props.setFilters("fill")}}>
            <input type="checkbox" autoComplete="off" />Looking For Fill
          </label>
          <label className={this.bandmates} onClick={() => {this.props.setFilters("bandmates")}}>
            <input type="checkbox" autoComplete="off" />Looking For Bandmates
          </label>
          <label className={this.member} onClick={() => {this.props.setFilters("member")}}>
            <input type="checkbox" autoComplete="off" />Looking For Member
          </label>
        </div>
      );
  }

  isSortActive(sortValue) {
      return `btn btn-sm btn-dark${sortValue === this.props.sort ? ' active': ''}`
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
    const { toggleSearch, sort, setSort} = this.props;
    const { valueCity, /* valueSearch */ } = this.state;
    return (
      <div className="jumbotron bg-secondary" style={{ paddingBottom: "10px"}}> 
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={this.handleCity}>
              <div className="row" style={{ justifyContent: 'center' }}>
                <input type="text" placeholder="Enter a City Name" id="city" value={valueCity} onChange={this.handleChange}></input>&nbsp;
                <button className="btn btn-sm btn-dark">Change City</button>
              </div>
            </form>
              <br />
            {/* <form onSubmit={this.handleSearch}>
              <div className="row" style={{ justifyContent: 'center' }}>
                <input type="text" placeholder="Search Here" id="search" value={valueSearch} onChange={this.handleChange}></input>&nbsp;
                <button className="btn btn-sm btn-dark">Search</button>
              </div>
            </form> */}
          </div>
          <div className="col-md-8">
            <div className="row" style={{ justifyContent: 'center' }}>
              <h3 className="text-white">Filter By:&nbsp;</h3>
              {this.filterByBar}
            </div>
            <br />
            <div className="row" style={{ justifyContent: 'center' }}>
              <h3 className="text-white">Sort By:&nbsp;</h3>
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className={this.isSortActive('date')} onClick={() => {setSort('date')}}>
                  <input type="radio" autoComplete="off" checked={sort === 'date'}/>Date
                </label>
                <label className={this.isSortActive('genre')} onClick={() => {setSort('genre')}}>
                  <input type="radio" autoComplete="off" checked={sort === "genre"}/>Genre
                </label>
                <label className={this.isSortActive('band name')} onClick={() => {setSort('band name')}}>
                  <input type="radio" autoComplete="off" checked={sort === "band name"}/>Band Name
                </label>
                <label className={this.isSortActive('event name')} onClick={() => {setSort('event name')}}>
                  <input type="radio" autoComplete="off" checked={sort === "event name"}/>Event Name
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: "50px" }}>
          <button type="button" className="btn btn-block btn-dark" onClick={toggleSearch}>Close</button>
        </div>
      </div>
    )
  }
}

export default Search;
