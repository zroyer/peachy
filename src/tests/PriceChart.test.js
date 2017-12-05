import React from 'react';
import ReactDOM from 'react-dom';
import PriceChart from '../components/PriceChart';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PriceChart />, div);
});
