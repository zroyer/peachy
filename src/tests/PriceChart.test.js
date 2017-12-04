import React from 'react';
import ReactDOM from 'react-dom';
import LivePrice from '../components/PriceChart';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PriceChart />, div);
});
