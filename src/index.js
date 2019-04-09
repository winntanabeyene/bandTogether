import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    
  }

  render() {
    return (
      <div className="container-fluid">
        <Navbar />
        <div className="row">
          <div className="col-md-12">
            <Home />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));