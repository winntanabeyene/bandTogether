import React from 'react';

class CreateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueName: '',
            valueCity: '',
            valueState: '',
            valueGenre: '',
            valueBirthdate: '',
            valueImageUrl:'',
            valueBio:'',
            valueBandcampUrl: '',
            valueSpotifyUrl: '',
            valueFacebookUrl:'',
            valueHomepageUrl:'',
            valueEmail: '',
            valuePhoneNum: '',
            valueFacebookContact: '',
        
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
      const {changeView, handlePatchProfile, getCurrentProfile} = this.props;
     const { 
        valueName, valueCity, valueState, valueGenre, 
        valueBirthdate, valueImageUrl, valueBio, 
        valueBandcampUrl, valueSpotifyUrl, valueFacebookUrl, 
        valueHomepageUrl, valueEmail, valuePhoneNum, valueFacebookContact } = this.state;
    const newArtist = {
        name: valueName,
        city: valueCity,
        state: valueState,
        genre: valueGenre,
        birthday: valueBirthdate,
        image_url: valueImageUrl,
        bio: valueBio,
        bandcamp_url: valueBandcampUrl,
        spotify_url: valueSpotifyUrl,
        facebook_url: valueFacebookUrl,
        homepage_url: valueHomepageUrl,
        contact_email: valueEmail,
        contact_num: valuePhoneNum,
        contact_facebook: valueFacebookContact
    }
    handlePatchProfile(newArtist);
    this.setState({
      valueName: '', 
      valueCity: '', 
      valueState: '', 
      valueGenre: '',
      valueBirthdate: '', 
      valueImageUrl: '', 
      valueBio: '', 
      valueBandcampUrl: '', 
      valueSpotifyUrl: '', 
      valueFacebookUrl: '', 
      valueHomepageUrl: '', 
      valueEmail: '', 
      valuePhoneNum: '', 
      valueFacebookContact: ''
    });
    event.preventDefault();
    changeView('profile');
  }

  handleChange(event) {
    const { value } = event.target;
    switch(event.target.id) {
      case 'name':
        this.setState({
          valueName: value
        });
        break;
      case 'city':
        this.setState({
          valueCity: value
        });
        break;
      case 'state':
        this.setState({
          valueState: value
        });
        break;
      case 'genre':
        this.setState({
          valueGenre: value
        });
        break;
      case 'date':
        this.setState({
          valueBirthdate: value
        });
        break;
      case 'img':
        this.setState({
          valueImageUrl: value
        });
        break;
      case 'bio':
        this.setState({
          valueBio: value
        });
        break;
      case 'bandcamp':
        this.setState({
          valueBandcampUrl: value
        });
        break;
      case 'spotify':
        this.setState({
          valueSpotifyUrl: value
        });
        break;
      case 'facebook':
        this.setState({
          valueFacebookUrl: value
        });
        break;
      case 'homepage':
        this.setState({
          valueHomepageUrl: value
        });
        break;
      case 'email':
        this.setState({
          valueEmail: value
        });
        break;
      case 'phone':
        this.setState({
          valuePhoneNum: value
        });
        break;
      case 'fbcontact':
        this.setState({
          valueFacebookContact: value
        });
        break;
    }
  }

render() {
    const { toggleForm } = this.props;
    const { 
        valueName, valueCity, valueState, valueGenre, 
       valueBirthdate, valueImageUrl, valueBio, 
        valueBandcampUrl, valueSpotifyUrl, valueFacebookUrl, 
        valueHomepageUrl, valueEmail, valuePhoneNum, valueFacebookContact } = this.state;
    return (
        <div className="jumbotron text-center text-white bg-secondary" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <h3>Create a Listing</h3>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>
                        Artist Name:
              <input value={valueName} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="name" placeholder="Enter artist name"/>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        City:
              <input value={valueCity} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="city" placeholder="Enter city"/>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        State:
              <input value={valueState} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="state" placeholder="Enter state"/>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Genre:
              <input value={valueGenre} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="genre" placeholder="Enter genre"/>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Date Formed:
              <input value={valueBirthdate} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="date" placeholder="Enter date formed" />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Image URL:
              <input value={valueImageUrl} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="img" placeholder="Enter artist image url" />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Bio:
              <input value={valueBio} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="bio" placeholder="Enter artist biography" />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        BandCamp URL:
              <input value={valueBandcampUrl} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="bandcamp" placeholder="Enter Bandcamp url" />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Spotify URL:
              <input value={valueSpotifyUrl} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="spotify" placeholder="Enter Spotify url" />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Facebook URL:
              <input value={valueFacebookUrl} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="facebook" placeholder="Enter Facebook url" />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Homepage URL:
              <input value={valueHomepageUrl} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="homepage" placeholder="Enter an Homepage url" />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Contact Email:
              <input value={valueEmail} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="email" placeholder="Enter contact email" />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Contact Number:
              <input value={valuePhoneNum} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="phone" placeholder="Enter contact phone number" />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Facebook Contact Info:
              <input value={valueFacebookContact} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="fbcontact" placeholder="Enter Facebook contact" />
                    </label>
                </div>
                <button className="btn btn-dark" type="submit">Update Profile</button>
            </form>
        </div>
    )
}
}
export default CreateProfile;