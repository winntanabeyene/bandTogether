import React from 'react';

import ListItem from './ListItem.jsx';

const ListView = ({listings, bands, musicians}) => (
    <div style={{ border: '2px solid black' }}>
        <h3>Listings</h3>
        <div>
        {listings.map(listing => <ListItem listing={listing} bands={bands} musicians={musicians} />)}
        </div>
    </div>
);

export default ListView;