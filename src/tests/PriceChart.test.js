import React from 'react';
import ReactDOM from 'react-dom';
import PriceChart from '../components/PriceChart';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;


it('renders PriceChart without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PriceChart />, div);
});

it('renders RadioGroup without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RadioGroup />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RadioButton />, div);
});
