import React from 'react';
import { shallow } from 'enzyme';
import LivePrice from '../components/LivePrice';

describe('<LivePrice />', () => {
  it('renders LivePrice', () => {
    const wrapper = shallow(<LivePrice />);
    expect(wrapper.length).toBe(1);
  });
});
