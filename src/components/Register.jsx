import React from 'react';
import Alert from 'react-bootstrap/Alert';
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            city: '',
            solo: '1',
            artist: '',
            password1: '',
            password2: '',
            signupFail: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
     const { username, email, city, solo, artist, password1, password2} = this.state;
     const{ handleSignup } = this.props;
     if (password1 === password2){
         const newAccount = {
             username,
             email,
             password1,
             password2,
             contact_email: email,
             name: artist,
             city,
             solo,
         }
         handleSignup(newAccount)
          .then(() => {
            this.setState({
              username: '', 
              email: '', 
              city: '', 
              solo: '1', 
              artist: '', 
              password1: '', 
              password2:''
            });
          })
          .catch((error) => {
            console.error(error);
            this.setState({ signupFail: true });
            setTimeout(() => {
              this.setState({ signupFail: false });
            }, 7000)
          })
         event.preventDefault();
     }else {
        this.setState({
            password1: '',
            password2: '',
        }) 
        alert('Passwords did not match.')
     }
    event.preventDefault();
  }


    handleChange(event) {
    const { value } = event.target;
    switch(event.target.id) {
      case 'name':
        this.setState({
          username: value,
        });
        break;
      case 'email':
        this.setState({
          email: value,
        });
        break;
      case 'city':
        this.setState({
          city: value
        });
        break;
      case 'artist':
        this.setState({
          artist: value
        });
        break;
      case 'password1':
        this.setState({
          password1: value
        });
        break;
      case 'password2':
        this.setState({
          password2: value
        });
        break;
      case 'solo':
        this.setState({
          solo: value
        });
        break;
      case 'band':
        this.setState({
          solo: value
        });
        break;  
    }
  }

render() {
    const { changeView } = this.props;
    const{ username, email, city, solo, artist, password1, password2, signupFail} = this.state
    return (
<div className="row mt-5">
    <div className="col-md-6 m-auto">
        <div className="card card-body">
            <h1 className="text-center mb-3">
               Register
            </h1>
            {signupFail && (
              <Alert variant="danger">
                <Alert.Heading>Failed to Sign Up</Alert.Heading>
                <p>Check that all fields are correct or that an account doesn't already exist with that username.</p>
              </Alert>
            )}
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        onChange={this.handleChange}
                        type="name"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Enter Name"
                        value={username}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        onChange={this.handleChange}
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter Email"
                        value={email}
                    />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input
                        onChange={this.handleChange}
                        type="text"
                        id="city"
                        name="city"
                        className="form-control"
                        placeholder="Enter City"
                        value={city}
                    />
                </div>
                <div className="form-group">
                    <label>Artist Name</label>
                    <input
                        onChange={this.handleChange}
                        type="text"
                        id="artist"
                        name="artist"
                        className="form-control"
                        placeholder="Enter Artist Name"
                        value={artist}
                    />
                </div>
                <div>
                    <p>Solo Artist or Band?</p>
                    <div>
                        <input onClick={this.handleChange} type='radio' id='solo' name="soloOrBand" value={"1"} defaultChecked />
                        <label style={{margin: '0 10px 0 10px'}}>Solo Artist</label>
                        <input onClick={this.handleChange} type='radio' id='band' name="soloOrBand" value={"0"} />
                        <label style={{margin: '0 10px 0 10px'}}>Band</label>
                    </div>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        onChange={this.handleChange}
                        type="password"
                        id="password1"
                        name="password"
                        className="form-control"
                        placeholder="Create Password"
                        value={password1}
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        onChange={this.handleChange}
                        type="password"
                        id="password2"
                        name="password2"
                        className="form-control"
                        placeholder="Confirm Password"
                        value={password2}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                    Register
        </button>
            </form>
                <p className="lead mt-4">Have An Account? <a onClick={() => {changeView('login')}} href="#">Login</a></p>
        </div>
    </div>
</div>
)};
}
export default Register;