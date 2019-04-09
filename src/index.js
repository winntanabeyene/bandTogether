import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from './components/Navbar.jsx';
class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Navbar />
        <h1>React App</h1>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));