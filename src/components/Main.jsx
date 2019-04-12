import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Profile from './Profile.jsx'
import Home from './Home.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx'

const Main = () => (
  <div className='row'>
    <div className="col-md-12">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Register} />
      </Switch>
    </div>
  </div>
)

export default Main;
