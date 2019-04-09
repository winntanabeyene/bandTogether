import React from 'react';
import SCPlayer from 'react-soundcloud-player';
import BandcampPlayer from 'react-bandcamp';
import SpotifyPlayer from 'react-spotify-player';

import listings from '../../mockData/listing';
import accounts from '../../mockData/account';
import bands from '../../mockData/band';
import instruments from '../../mockData/instrument';
import musicians from '../../mockData/musician';
import profiles from '../../mockData/profile';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        console.log(profiles)
        return (
            <div className="jumbotron">
                <div className="row">
                    <div className="col-md-12">
                        <div>
                            <img style={{ maxHeight: '250px'}} src={profiles.data[0].url}/>
                        </div>
                        <div>
                            {profiles.data[0].bio}
                        </div>
                        <div>
                            <a href={profiles.data[0].url_bandcamp}>Bandcamp Link</a>
                        </div>
                        <div>
                            <a href={profiles.data[0].url_spotify}>Spotify Link</a>
                        </div>
                        <div>
                            <a href={profiles.data[0].url_facebook}>Facebook Link</a>
                        </div>
                        <div>
                            <a href={profiles.data[0].url_homepage}>Homepage Link</a>
                        </div>
                        <div>
                            <SCPlayer />
                        </div>
                        <div>
                            <BandcampPlayer />
                        </div>
                        <div>
                            <SpotifyPlayer />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Profile;