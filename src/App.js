import React, { Component } from 'react';
import './App.css';
import LivePrice from './components/LivePrice';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1><span role="img" aria-labelledby="peach">🍑</span></h1>
        </header>
        <LivePrice />
      </div>
    );
  }
}

export default App;
