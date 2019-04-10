import React from 'react';

import ListItem from './ListItem.jsx';

const ListView = ({listings, bands, musicians}) => (
    <div style={{ border: '2px solid black', paddingTop: "5px" }} className="jumbotron bg-secondary">
        <div style={{ justifyContent: 'center' }} className="row">
            <h2 className="text-white">Listings for All Cities</h2>
        </div>
        <div>
        {listings.map(listing => <ListItem listing={listing} bands={bands} musicians={musicians} />)}
        </div>
    </div>
);

export default ListView;