import React from 'react';
import Alert from 'react-bootstrap/Alert';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passFail: false,
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
    const { handleLogin } = this.props;
    const { username, password} = this.state;
    const newLogin = {
      username,
      password,
    }
    handleLogin(newLogin)
    .then(() => {
      this.setState({
        username: '', 
        password:''
      });
    })
    .catch((err) => {
      console.error(err);
      this.setState({ passFail: true });
      setTimeout(() => {
        this.setState({ passFail: false });
      }, 7000)
    })
    event.preventDefault();
  }


  render(){
    const { changeView } = this.props;
    const { username, password, passFail } = this.state;
    return (
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i>Login</h1>
            {passFail && (
            <Alert dismissable variant="danger">
              <Alert.Heading>Failure to log in</Alert.Heading>
              <p>Check your username or password</p>
            </Alert>
            )}
            <form onSubmit={this.handleSubmit} href="#">
              <div className="form-group">
                <label>Username</label>
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
                <label>Password</label>
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

export default Login;