import React from 'react';
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            city: '',
            solo: '',
            artist: '',
            password1: '',
            password2: '',

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
     const { username, email, city, solo, artist, password1, password2} = this.state;
     if (password1 === password2){
         const newAccount = {
             username,
             email,
             password1,
             password2,
         }
         const newProfile = {
             name: artist,
             city,
             solo,
         }
         console.log(newAccount, newProfile);
         this.setState({
             username: '', 
             email: '', 
             city: '', 
             solo: '', 
             artist: '', 
             password1: '', 
             password2:''
           
         });

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
    const{ username, email, city, solo, artist, password1, password2} = this.state
    return (
<div class="row mt-5">
    <div class="col-md-6 m-auto">
        <div class="card card-body">
            <h1 class="text-center mb-3">
               Register
            </h1>
            <form onSubmit={this.handleSubmit} href="#">
                <div class="form-group">
                    <label for="name">Username</label>
                    <input
                        onChange={this.handleChange}
                        type="name"
                        id="name"
                        name="name"
                        class="form-control"
                        placeholder="Enter Name"
                        value={username}
                    />
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                        onChange={this.handleChange}
                        type="email"
                        id="email"
                        name="email"
                        class="form-control"
                        placeholder="Enter Email"
                        value={email}
                    />
                </div>
                <div class="form-group">
                    <label for="city">City</label>
                    <input
                        onChange={this.handleChange}
                        type="text"
                        id="city"
                        name="city"
                        class="form-control"
                        placeholder="Enter City"
                        value={city}
                    />
                </div>
                <div class="form-group">
                    <label for="artist">Artist Name</label>
                    <input
                        onChange={this.handleChange}
                        type="text"
                        id="artist"
                        name="artist"
                        class="form-control"
                        placeholder="Enter Artist Name"
                        value={artist}
                    />
                </div>
                <div>
                    <p>Solo Artist or Band?</p>
                    <div>
                        <input onClick={this.handleChange} type='radio' id='solo' name="soloOrBand" value='solo' checked />
                        <label style={{margin: '0 10px 0 10px'}} for='solo'>Solo Artist</label>
                        <input onClick={this.handleChange} type='radio' id='band' name="soloOrBand" value='band' />
                        <label style={{margin: '0 10px 0 10px'}} for='band'>Band</label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        onChange={this.handleChange}
                        type="password"
                        id="password1"
                        name="password"
                        class="form-control"
                        placeholder="Create Password"
                        value={password1}
                    />
                </div>
                <div class="form-group">
                    <label for="password2">Confirm Password</label>
                    <input
                        onChange={this.handleChange}
                        type="password"
                        id="password2"
                        name="password2"
                        class="form-control"
                        placeholder="Confirm Password"
                        value={password2}
                    />
                </div>
                <button type="submit" class="btn btn-primary btn-block">
                    Register
        </button>
            </form>
                <p class="lead mt-4">Have An Account? <a onClick={() => {changeView('login')}} href="#">Login</a></p>
        </div>
    </div>
</div>
)};
}
export default Register;