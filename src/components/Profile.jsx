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
        console.log(profile)
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
        console.log(performer)
        
        return (
            <div className="jumbotron">
                <div>
                    <div className="row">
                        <div className='col-md-5' style={{ border: '1px solid black' }}>
                            <img style={{ maxHeight: '200px'}} src={profile.url}/>
                        </div>
                        <div className='col-md-7' style={{ border: '1px solid black' }}>
                            <h1>Information</h1>
                            <div>
                                Artist Name: {performer.name}
                            </div>
                            <div>
                                Artist Bio: {profile.bio}
                            </div>
                            <div>
                                Genre: {performer.genre}
                            </div>
                            <div>
                                City: {performer.city}
                            </div>
                        </div>
                    </div>
                     <div className='row'>
                        <div className='col-md-4' style={{ border: '1px solid black' }}>
                            <h1>Links</h1>
                            <div>
                                <a href={profile.url_bandcamp}>Bandcamp Link</a>
                            </div>
                            <div>
                                <a href={profile.url_spotify}>Spotify Link</a>
                            </div>
                            <div>
                                <a href={profile.url_facebook}>Facebook Link</a>
                            </div>
                            <div>
                                <a href={profile.url_homepage}>Homepage Link</a>
                            </div>
                        </div>
                        <div className='col-md-8'>
                            <h1>Music</h1>
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
                            <h1>Events</h1>
                            <ListView listings={events} bands={bands} musicians={musicians} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Profile;