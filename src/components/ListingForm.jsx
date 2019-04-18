/* eslint-disable default-case */
import React from 'react';

class ListingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueEName: '',
      valueDate: '',
      valueDescr: '',
      valueVenue: '',
      valueImg: '',
      valueType: '',
      valueAddress: '',
      valueCity: '',
      valueState: '',
      valueZipCode: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { handleNewListing } = this.props;
    const { valueEName, valueDate, valueDescr, valueVenue, valueImg, valueType, valueAddress, valueCity, valueState, valueZipCode } = this.state;
    const newListing = {
      title: valueEName,
      date: valueDate,
      description: valueDescr,
      venue: valueVenue,
      type: valueType,
      image_url: valueImg,
      address: valueAddress,
      city: valueCity,
      state: valueState,
      zip_code: valueZipCode

    }
    handleNewListing(newListing)
      .then(() => {
        this.setState({
          valueEName: '',
          valueDate: '',
          valueDescr: '',
          valueVenue: '',
          valueImg: '',
          valueType: '',
          valueAddress: '',
          valueCity: '',
          valueState: '',
          valueZipCode: ''
        });
      })
    event.preventDefault();
  }

  handleChange(event) {
    const { value } = event.target;
    switch(event.target.id) {
      case 'event':
        this.setState({
          valueEName: value
        });
        break;
      case 'date':
        this.setState({
          valueDate: value
        });
        break;
      case 'descr':
        this.setState({
          valueDescr: value
        });
        break;
      case 'venue':
        this.setState({
          valueVenue: value
        });
        break;
      case 'address':
        this.setState({
          valueAddress: value
        })
        break;
      case 'city':
        this.setState({
          valueCity: value
        })
        break;
      case 'state':
        this.setState({
          valueState: value
        })
        break;
      case 'zip-code':
        this.setState({
          valueZipCode: value
        })
        break;
      case 'type':
        this.setState({
          valueType: value
        });
        break;
      case 'img':
        this.setState({
          valueImg: value
        });
        break;
    }
  }

  render() {
    const { toggleForm } = this.props;
    const { valueEName, valueDate, valueDescr, valueVenue, valueImg, valueType, valueAddress, valueCity, valueState, valueZipCode } = this.state;
    return (
      <div className="jumbotron text-center text-white bg-secondary" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
        <h3>Create a Listing</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Event Name:
              <input value={valueEName} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="event" placeholder="Enter an event name" />
            </label>
          </div>
          <div className="form-group">
            <label>
              Date:
              <input value={valueDate} onChange={this.handleChange} className="form-control form-control-sm" type="date" id="date" />
            </label>
          </div>
          <div className="form-group">
            <label>
              Description:
              <input value={valueDescr} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="descr" placeholder="Enter an event description"/>
            </label>
          </div>
          <div className="form-group">
            <label>
              Venue:
              <input value={valueVenue} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="venue" placeholder="Enter a venue (if applicable)"/>
            </label>
          </div>
          <div className="form-group">
            <label>
              Address:
              <input value={valueAddress} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="address" placeholder="Enter street and number"/>
            </label>
          </div>
          <div className="form-group">
            <label>
              City:
              <input value={valueCity} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="city" placeholder="Enter city"/>
            </label>
          </div>
          <div className="form-group">
            <label>
              State:
              <input value={valueState} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="state" placeholder="Enter state"/>
            </label>
          </div>
          <div className="form-group">
            <label>
              Zip code:
              <input value={valueZipCode} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="zip-code" placeholder="Enter zip code"/>
            </label>
          </div>
          <div className="form-group">
            <label>
              Type:
              <select value={valueType} onChange={this.handleChange} className="custom-select" id="type">
                <option value="" disabled selected>Select a Listing Type</option>
                <option value="Band for Gig">Looking for Gig</option>
                <option value="Band for Fill">Looking for Fill</option>
                <option value="Band for Member">Looking for Member</option>
                <option value="Musician for Band">Looking for Band</option>
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              Image Url:
              <input value={valueImg} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="img" placeholder="Enter an event img url" />
            </label>
          </div>
          <button className="btn btn-dark" type="submit">Submit Your Listing</button>
          <button type="button" className="btn btn-dark" onClick={toggleForm}>Close</button>
        </form>
      </div>
    )
  }
}

export default ListingForm;
