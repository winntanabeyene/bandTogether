import React from 'react';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import axios from 'axios';
import ListingComments from './ListingComments';
import Modal from 'react-bootstrap/Modal';


class ListItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      shown: false,
      contactInfo: {},
      bandData: {},
    };
    
    this.handleClick = this.handleClick.bind(this);
    this.profileClick = this.profileClick.bind(this);
  }

  componentDidMount() {
    console.log(this.props.userProfile)
    const bandData = this.props.artists.filter((artist) => {
      return (artist.id === this.props.listing.artistId);
    }).pop();
    this.setState({bandData});
  }

  /**
   * Changes the currentProfile state of the parent component to the profile of the listing clicked.
   * 
   * @param {Object} e The event object
   */
  profileClick(e) {
    e.preventDefault();
    this.props.changeProfile(this.state.bandData);
  }
  
  /**
   * Handles whenever a user clicks on the "Respond to this Listing" button.
   * Makes a request to the server to grab the contact info of the artist who made the posting.
   */
  handleClick() {
    if (!this.state.shown) {
      const { listing } = this.props;
      return axios.get(`/listings/contact?id=${listing.id}`)
        .then((response) => {
          const artistData = response.data;
          const contactInfo = {
            email: artistData.contact_email,
            number: artistData.contact_num,
          }
          this.setState({contactInfo, shown: true});
        })
    } else {
      this.setState({contactInfo: {}, shown: false});
    }
  }

  render() {
    const {listing, isLoggedIn, userProfile} = this.props;
    const { contactInfo, bandData } = this.state;
    const popover = (
      <Popover id="popover-basic">
        {isLoggedIn && (
          <div>
            <ul>
              {contactInfo.email && <li>Email:&nbsp;{contactInfo.email}</li>}
              {contactInfo.number && <li>Number:&nbsp;{contactInfo.number}</li>}
            </ul>
          </div>
        )}
        {!isLoggedIn && "Must be logged in to view contact info!"}
      </Popover>
    )
    return (
    <div className="list-group-item bg-light" >
      <div className="row d-flex w-100 justify-content-between">
        <div className="col-md-3 flex-grow-1">
          <img className="img-fluid" alt="" style={{maxHeight: '180px', maxWidth: '180px'}} src={listing.image_url} />
        </div>
        <div className="col-md-4 flex-grow-1">
          <h3>{listing.title}</h3>
          <p className="text-body">{listing.description}</p>
        </div>
        <div className="col-md-3 flex-grow-1">
          <div className="row"><h6>Poster:&nbsp;</h6><a href="#!" onClick={this.profileClick}>{bandData.name}</a></div>
          <div className="row"><h6>Type:&nbsp;</h6>{listing.type}</div>
          <div className="row"><h6>City:&nbsp;</h6>{bandData.city}</div>
          <div className="row"><h6>Genre:&nbsp;</h6>{bandData.genre}</div>
          <div className="row"><h6>Venue:&nbsp;</h6>{listing.venue}</div>
          <div className="row"><h6>Date:&nbsp;</h6>{listing.date}</div>
        </div>
        <div className="col-md-2 flex-grow-1">
          <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <button type="button" onClick={this.handleClick} className="btn btn-secondary">Respond to this Listing</button>
          </OverlayTrigger>
          <ListingComments userProfile={userProfile} listing={listing}/>
        </div>
      </div>
    </div>
    )
  }
} 
export default ListItem;