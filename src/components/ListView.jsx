import React from 'react';

import ListItem from './ListItem.jsx';

const ListView = ({listings, artists}) => (
    <div style={{ paddingTop: "5px" }} className="jumbotron bg-secondary">
        <div style={{ justifyContent: 'center' }} className="row">
            <h2 className="text-white">Listings for All Cities</h2>
        </div>
        <div className="list-group">
        {listings.map(listing => <ListItem listing={listing} artists={artists} />)}
        </div>
    </div>
);

export default ListView;