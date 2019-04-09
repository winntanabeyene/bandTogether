import React from 'react';

const ListItem = ({listing, bands, musicians}) => {
    let performer =[];
    var perfType;

        if(listing.musician_id || listing.musician_id === 0){
            performer = musicians;
            perfType = 'musician_id';
        }else {
            performer = bands;
            perfType = 'band_id';
        }

    const bandData = performer.data[listing[perfType]];
    
    return (
    <div style={{ border: '1px solid black' }} >
        <div style={{ border: '1px solid black' }}>
            <img style={{maxHeight: '100px'}} src={listing.url_image} />
            <div>Event Name: {listing.title}</div>
            <div>Event Descrpition:{listing.description}</div>
        </div>
        <div style={{ border: '1px solid black' }}>
            <div>Type: {listing.type}</div>
            <div>City: {bandData.city}</div>
            <div>Genre: {bandData.genre}</div>
            <div>Venue: {listing.venue}</div>
        </div>
        <div style={{ border: '1px solid black' }}>
            <button>Bookmark this Listing</button>
            <button>Respond to this Listing</button>
        </div>
    </div>
    )
}
export default ListItem;