import React from 'react';
import ReactDOM from 'react-dom';
import ToolTip from '../components/CustomTooltip';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomTooltip />, div);
});
