import React from 'react';
import SCPlayer from 'react-soundcloud-player';
import BandcampPlayer from 'react-bandcamp';
import SpotifyPlayer from 'react-spotify-player';
import ListView from './ListView';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileId: 1,
        };
    }


    render() {
        const {profileId} = this.state
        const { accounts, artists, listings } = this.props;
        const profile = artists.data.filter((artist) =>{
            return (artist.id === profileId )
        }).pop();
        console.log(profile)
        let performer;
        let events = [];
        events = listings.filter((listing) => {
            return (listing.artist_id === profile.id)
        })
        // console.log(performer)
        
        return (
            <div className="jumbotron">
                <div>
                    <div className="row">
                        <div className='col-md-4'>
                            <img className="img-fluid" alt="" style={{ maxHeight: "300px" }} src={profile.image_url}/>
                        </div>
                        <div className='col-md-8'>
                            <div className="container">
                                <div className="row"><h1 className="display-4">{profile.name}</h1></div>
                                <div className="row"><h6>City:&nbsp;</h6>{profile.city}</div>
                                <div className="row"><h6>Genre:&nbsp;</h6>{profile.genre}</div>
                                <div className="row"><h6>Bio:&nbsp;</h6>
                                    <div className="container-fluid">{profile.bio}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-4'>
                            <h1 className="display-4">Links</h1>
                            <div>
                                <h3>Bandcamp:</h3>
                                <a href={profile.bandcamp_url}>{profile.bandcamp_url}</a>
                            </div>
                            <div>
                                <h3>Spotify:</h3>
                                <a href={profile.spotify_url}>{profile.spotify_url}</a>
                            </div>
                            <div>
                                <h3>Facebook:</h3>
                                <a href={profile.facebook_url}>{profile.facebook_url}</a>
                            </div>
                            <div>
                                <h3>Homepage:</h3>
                                <a href={profile.homepage_url}>{profile.homepage_url}</a>
                            </div>
                        </div>
                        <div className='col-md-8'>
                            <h1 className="display-4">Music</h1>
                            <div>
                                <SCPlayer 
                                    client_id="c5a171200f3a0a73a523bba14a1e0a29"
                                    audio_id="193179003"
                                    title="Easyfun - Fanta"
                                />
                            </div>
                            <div>
                                <BandcampPlayer 
                                album='552086667'
                               />
                            </div>
                            <div>
                                <SpotifyPlayer   
                                    uri="spotify:album:1TIUsv8qmYLpBEhvmBmyBk"
                                    size={{
                                        width: '35%',
                                        height: 120,
                                        }}
                                    view={'list'}
                                    theme={'black'}/> 
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <ListView listings={events} artists={artists} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Profile;