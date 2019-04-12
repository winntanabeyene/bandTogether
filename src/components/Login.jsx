import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
    const { value } = event.target;
    switch(event.target.id) {
      case 'username':
        this.setState({
          username: value,
        });
        break;
      case 'password':
        this.setState({
          password: value,
        });
        break;
    }
}


    handleSubmit(event) {
     const { username, password} = this.state;
    const newLogin = {
        username,
        password,
    }
    console.log(newLogin);
    this.setState({
        username: '', 
        password:''
    });
    event.preventDefault();
  }


    render(){
        const { changeView } = this.props;
        const { username, password } = this.state;
        return (
    <div className="row mt-5">
        <div className="col-md-6 m-auto">
            <div className="card card-body">
                <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i>  Login</h1>
                <form onSubmit={this.handleSubmit} href="#">
                    <div className="form-group">
                        <label for="username">Username</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            id="username"
                            name="username"
                            className="form-control"
                            placeholder="Enter Username"
                            value={username}
                        />
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input
                            onChange={this.handleChange}
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter Password"
                            value={password}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>
                <p className="lead mt-4">
                        No Account? <a onClick={() => {changeView('register')}}href="#">Register</a>
                </p>
            </div>
        </div>
    </div>
    )};
}
export default Login