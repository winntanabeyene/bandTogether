import React from 'react';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';



const ListItem = ({listing, artists, isLoggedIn}) => {
    const bandData = artists.filter((artist) => {
        return (artist.id === listing.artistId);
    }).pop();
    
    const popover = (
        <Popover id="popover-basic">
            {isLoggedIn && "Contact info here!"}
            {!isLoggedIn && "Must be logged in to view contact info!"}
        </Popover>
    )

    return (
    <div className="list-group-item d-flex w-100 justify-content-between bg-light" >
        <div className="row">
            <div className="col-md-3">
                <img alt="" style={{maxHeight: '180px', maxWidth: '180px'}} src={listing.image_url} />
            </div>
            <div className="col-md-4">
                <h3>{listing.title}</h3>
                <p className="text-body">{listing.description}</p>
            </div>
            <div className="col-md-3">
                <div className="row"><h6>Poster:&nbsp;</h6>{bandData.name}</div>
                <div className="row"><h6>Type:&nbsp;</h6>{listing.type}</div>
                <div className="row"><h6>City:&nbsp;</h6>{bandData.city}</div>
                <div className="row"><h6>Genre:&nbsp;</h6>{bandData.genre}</div>
                <div className="row"><h6>Venue:&nbsp;</h6>{listing.venue}</div>
                <div className="row"><h6>Date:&nbsp;</h6>{listing.date}</div>
            </div>
            <div className="col-md-2">
                <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                    <button type="button" className="btn btn-secondary">Respond to this Listing</button>
                </OverlayTrigger>
            </div>
        </div>
    </div>
    )
}
export default ListItem;