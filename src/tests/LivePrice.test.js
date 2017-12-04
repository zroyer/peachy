import React from 'react';
import ReactDOM from 'react-dom';
import LivePrice from '../components/LivePrice';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LivePrice />, div);
});
