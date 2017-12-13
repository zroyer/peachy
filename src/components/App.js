import React, { Component } from 'react';
import LivePrice from './LivePrice';
import PriceChart from './PriceChart';
import '../style/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LivePrice />
        <PriceChart />
      </div>
    );
  }
}

export default App;
