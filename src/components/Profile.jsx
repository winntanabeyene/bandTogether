import React from 'react';
import SCPlayer from 'react-soundcloud-player';
import BandcampPlayer from 'react-bandcamp';
import SpotifyPlayer from 'react-spotify-player';
import ListView from './ListView';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileId: 4,
        };
    }


    render() {
        const {profileId} = this.state
        const { bands, musicians, accounts, profiles, listings } = this.props.data;
        const profile = profiles.data.filter((profile) =>{
            return (profile.id === profileId )
        }).pop();
        // console.log(profile)
        let performer;
        let events = [];
            if (bands.data[profile.band_id]) {
                performer = bands.data[profile.band_id]
                events = listings.filter((listing) => {
                    return (listing.band_id === profile.band_id)
                })
            } else {
                performer = musicians.data[profile.musician_id]
                events = listings.filter((listing) => {
                    return (listing.musician_id === profile.musician_id)
                })
            }
        // console.log(performer)
        
        return (
            <div className="jumbotron">
                <div>
                    <div className="row">
                        <div className='col-md-4'>
                            <img className="img-fluid" alt="" style={{ maxHeight: "300px" }} src={profile.url}/>
                        </div>
                        <div className='col-md-8'>
                            <div className="container">
                                <div className="row"><h1 className="display-4">{performer.name}</h1></div>
                                <div className="row"><h6>City:&nbsp;</h6>{performer.city}</div>
                                <div className="row"><h6>Genre:&nbsp;</h6>{performer.genre}</div>
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
                                <a href={profile.url_bandcamp}>{profile.url_bandcamp}</a>
                            </div>
                            <div>
                                <h3>Spotify:</h3>
                                <a href={profile.url_spotify}>{profile.url_spotify}</a>
                            </div>
                            <div>
                                <h3>Facebook:</h3>
                                <a href={profile.url_facebook}>{profile.url_facebook}</a>
                            </div>
                            <div>
                                <h3>Homepage:</h3>
                                <a href={profile.url_homepage}>{profile.url_homepage}</a>
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
                            <ListView listings={events} bands={bands} musicians={musicians} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Profile;