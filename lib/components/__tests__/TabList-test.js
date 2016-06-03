/* global jest, describe, it, expect */
import React from 'react';
import { shallow } from 'enzyme';
import TabList from '../TabList';

describe('<TabList />', () => {
  it('should have sane defaults', () => {
    const wrapper = shallow(<TabList />);

    expect(wrapper.hasClass('ReactTabs__TabList')).toBe(true);
    expect(wrapper.prop('role')).toBe('tablist');
  });

  it('should accept className', () => {
    const wrapper = shallow(<TabList className="foobar" />);

    expect(wrapper.hasClass('ReactTabs__TabList')).toBe(true);
    expect(wrapper.hasClass('foobar')).toBe(true);
  });
});
