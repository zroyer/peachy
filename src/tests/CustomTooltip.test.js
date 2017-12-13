import React from 'react';
import { shallow } from 'enzyme';
import CustomTooltip from '../components/CustomTooltip';

describe('<CustomTooltip />', () => {
  it('renders CustomTooltip', () => {
    const wrapper = shallow(<CustomTooltip />);
    expect(wrapper.length).toBe(1);
  });
});
