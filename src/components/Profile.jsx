import React from 'react';
import SCPlayer from 'react-soundcloud-player';
import BandcampPlayer from 'react-bandcamp';
import SpotifyPlayer from 'react-spotify-player';
import ListView from './ListView';
import CreateProfile from './CreateProfile';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileId: 1,
            showForm: false,
        };
        this.toggleForm = this.toggleForm.bind(this);
    }
    toggleForm() {
    const currentState = this.state.showForm;
    this.setState({
      showForm: !currentState,
    });
  }


    render() {
        const { showForm } = this.state;
        const {profileId} = this.state
        const { changeView, accounts, artists, listings, isLoggedIn, currentProfile } = this.props;
        console.log(artists);
        const profile = currentProfile;
        console.log(currentProfile);
        let events = [];
        events = listings.filter((listing) => {
            return (listing.artistId === profile.id)
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
                        <div className='col-md-3'>
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
                        <div className='col-md-9'>
                            <ListView listings={events} artists={artists} isLoggedIn={isLoggedIn} />
                        </div>
                    </div>
                    <div>
                        <button type="button" className="btn btn-secondary" onClick={() => {changeView('createprofile')}}>Edit Profile</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default Profile;