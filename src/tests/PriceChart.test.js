import React from 'react';
import { shallow } from 'enzyme';
import PriceChart from '../components/PriceChart';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

describe('<PriceChart />', () => {
  it('renders PriceChart', () => {
    const wrapper = shallow(<PriceChart />);
    expect(wrapper.length).toBe(1);
  });
});

describe('<PriceChart />', () => {
  it('renders a RadioGroup component', () => {
    const wrapper = shallow(<PriceChart />);
    expect(wrapper.find(RadioGroup).length).toBe(1);
  });
});

describe('<PriceChart />', () => {
  it('renders a RadioButton component', () => {
    const wrapper = shallow(<PriceChart />);
    expect(wrapper.find(RadioButton).length).toBe(4);
  });
});
