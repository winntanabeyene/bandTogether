import React from 'react';

const ListItem = ({listing, artists}) => {
    const bandData = artists.data.filter((artist) => {
        return (artist.id === listing.artist_id);
    }).pop();
    
    return (
    <div className="list-group-item d-flex w-100 justify-content-between bg-light" >
        <div className="row">
            <div className="col-md-2">
                <img alt="" style={{maxHeight: '180px', maxWidth: '180px'}} src={listing.image_url} />
            </div>
            <div className="col-md-5">
                <h3>{listing.title}</h3>
                <p className="text-body">{listing.description}</p>
            </div>
            <div className="col-md-4">
                <div className="row"><h6>Poster:&nbsp;</h6>{bandData.name}</div>
                <div className="row"><h6>Type:&nbsp;</h6>{listing.type}</div>
                <div className="row"><h6>City:&nbsp;</h6>{bandData.city}</div>
                <div className="row"><h6>Genre:&nbsp;</h6>{bandData.genre}</div>
                <div className="row"><h6>Venue:&nbsp;</h6>{listing.venue}</div>
                <div className="row"><h6>Date:&nbsp;</h6>{listing.date}</div>
            </div>
            <div className="col-md-1">
                <button type="button" className="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="top" data-content="Contact Info Here">Respond to this Listing</button>
            </div>
        </div>
    </div>
    )
}
export default ListItem;