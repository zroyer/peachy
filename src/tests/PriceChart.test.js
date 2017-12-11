import React from 'react';
import ReactDOM from 'react-dom';
import PriceChart from '../components/PriceChart';
import { Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PriceChart />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RadioGroup />, div);
});
