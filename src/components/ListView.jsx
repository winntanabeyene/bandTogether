import React from 'react';

import ListItem from './ListItem.jsx';

const ListView = ({listings, artists, isLoggedIn, changeProfile}) => (
    <div style={{ paddingTop: "5px" }} className="jumbotron w-100 bg-secondary">
        <div style={{ justifyContent: 'center' }} className="row">
            <h2 className="text-white display-4">Listings for All Cities</h2>
        </div>
        <div className="list-group">
        {listings.map(listing => <ListItem isLoggedIn={isLoggedIn} changeProfile={changeProfile} key={listing.id} listing={listing} artists={artists} />)}
        </div>
    </div>
);

export default ListView;