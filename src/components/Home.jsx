import React from 'react';
import ListView from './ListView.jsx'
import Search from './Search.jsx';
import ListingForm from './ListingForm';

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
      showForm: false,
    };

    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm() {
    const currentState = this.state.showForm;
    this.setState({
      showForm: !currentState,
    });
  }

  render() {
    const { listings, artists } = this.props;
    const { showForm } = this.state;
    return (
      <div className="jumbotron">
        <div className="row">
          <div className="col-md-12">
            <Search />
          </div>
        </div>
        {!showForm && <button className="btn btn-dark btn-lg btn-block" type="button" onClick={this.toggleForm}>Create a Listing</button>}
        {showForm && <ListingForm toggleForm={this.toggleForm} />}
        <div className="row">
          <ListView listings={listings} artists={artists}/>
        </div>
      </div>
    )
  }
}


export default Home;
