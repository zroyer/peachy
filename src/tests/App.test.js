import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import App from '../components/App';
import LivePrice from '../components/LivePrice';
import PriceChart from '../components/PriceChart';

describe('<App />', () => {
  it('renders a LivePrice component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(LivePrice).length).toBe(1);
  });
});

describe('<App />', () => {
  it('renders a PriceChart component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(PriceChart).length).toBe(1);
  });
});
