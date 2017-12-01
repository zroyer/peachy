import React from 'react';
import ReactDOM from 'react-dom';
import LivePrice from './LivePrice';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LivePrice />, div);
});
