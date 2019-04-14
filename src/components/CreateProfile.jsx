import React from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

class CreateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            valuePhoneNum: '',
            validEmail: false,
            validNum: false,        
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    validateEmail() {
      const { valueEmail } = this.state;
      axios.get(`https://api.trumail.io/v2/lookups/json?email=${valueEmail}`)
        .then(({data}) => {
          const emailValid = data;
          if (!emailValid.deliverable) {
            this.setState({validEmail: false});
          } else if (emailValid.deliverable) {
            this.setState({validEmail: true})
          }
        })

    }

    handleSubmit(event) {

      const {changeView, handlePatchProfile} = this.props;
      const { 
        valueCity, valueState, valueGenre, 
        valueBirthdate, valueImageUrl, valueBio, 
        valueBandcampUrl, valueSpotifyUrl, valueFacebookUrl, 
        valueHomepageUrl, valuePhoneNum, } = this.state;
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
        contact_num: valuePhoneNum,
    }
    handlePatchProfile(newArtist);
    this.setState({ 
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
      valuePhoneNum: '', 
    });
    event.preventDefault();
    changeView('profile');
  }

  handleChange(event) {
    const { value } = event.target;
    switch(event.target.id) {
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
      case 'phone':
        this.setState({
          valuePhoneNum: value
        });
        break;
    }
  }

render() {
    const { toggleForm } = this.props;
    const { 
        valueCity, valueState, valueGenre, 
       valueBirthdate, valueImageUrl, valueBio, 
        valueBandcampUrl, valueSpotifyUrl, valueFacebookUrl, 
        valueHomepageUrl, valuePhoneNum } = this.state;
    return (
        <div className="jumbotron text-center text-white bg-secondary" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <h3>Create a Listing</h3>
            <form onSubmit={this.handleSubmit}>
              <div className='row justify-content-center'>
                <div className="form-group">
                    <label className='col-md-12'>
                        City:
                      <input value={valueCity} onChange={this.handleChange} className="form-control form-control-md" type="text" id="city" placeholder="Enter city"/>
                    </label>
                </div>
                <div className="form-group">
                    <label className='col-md-12'>
                        State:
                      <input value={valueState} onChange={this.handleChange} className="form-control form-control-md" type="text" id="state" placeholder="Enter state"/>
                    </label>
                </div>
              </div>
              <div className='row justify-content-center'>
                <div className="form-group">
                    <label className='col-md-12'>
                        Genre:
                          <input value={valueGenre} onChange={this.handleChange} className="form-control form-control-md" type="text" id="genre" placeholder="Enter genre"/>
                    </label>
                </div>
                <div className="form-group">
                    <label className='col-md-12'>
                        Date Formed:
              <input value={valueBirthdate} onChange={this.handleChange} className="form-control form-control-sm" type="date" id="date" placeholder="Enter date formed" />
                    </label>
                </div>
              </div>
              <div className='row justify-content-center'>
                <div className="form-group">
                    <label className='col-md-12'>
                        Image URL:
                        <input value={valueImageUrl} onChange={this.handleChange} className="form-control form-control-md" type="text" id="img" placeholder="Enter artist image url" />
                    </label>
                </div>
                <div className="form-group">
                    <label className='col-md-12'>
                        Contact Number:
                      <input value={valuePhoneNum} onChange={this.handleChange} className="form-control form-control-md" type="text" id="phone" placeholder="Enter contact phone number" />
                    </label>
                </div>
              </div>
              <div className='row justify-content-center'>
                <div className="form-group">
                    <label className='col-md-12'>
                        BandCamp URL:
                        <input value={valueBandcampUrl} onChange={this.handleChange} className="form-control form-control-md" type="text" id="bandcamp" placeholder="Enter Bandcamp url" />
                    </label>
                </div>
                <div className="form-group">
                    <label className='col-md-12'>
                        Spotify URL:
                        <input value={valueSpotifyUrl} onChange={this.handleChange} className="form-control form-control-md" type="text" id="spotify" placeholder="Enter Spotify url" />
                    </label>
                </div>
              </div>
              <div className='row justify-content-center'>
                <div className="form-group">
                    <label className='col-md-12'>
                        Facebook URL:
                        <input value={valueFacebookUrl} onChange={this.handleChange} className="form-control form-control-md" type="text" id="facebook" placeholder="Enter Facebook url" />
                    </label>
                </div>
                <div className="form-group">
                    <label className='col-md-12'>
                        Homepage URL:
              <input value={valueHomepageUrl} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="homepage" placeholder="Enter an Homepage url" />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Contact Email:
              <input value={valueEmail} onBlur={this.validateEmail} onChange={this.handleChange} className="form-control form-control-sm" type="text" id="email" placeholder="Enter contact email" />
                    </label>
                    {!validEmail && 
                    <Alert variant='danger'>
                      That's not a valid email!
                    </Alert>}
                    {validEmail && 
                    <Alert variant='success'>
                      That's a valid email!
                    </Alert>}
                </div>
              </div>
                 <div className="form-group">
                    <label className='col-md-6'>
                        Bio:
                        <input value={valueBio} onChange={this.handleChange} className="form-control form-control-md" type="text" id="bio" placeholder="Enter artist biography" />
                    </label>
                </div>
                <button className="btn btn-dark" type="submit">Update Profile</button>
            </form>
        </div>
    )
}
}
export default CreateProfile;