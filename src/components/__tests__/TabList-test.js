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

  it('should pass through custom properties', () => {
    const wrapper = shallow(<TabList data-tooltip="Tooltip contents" />);

    expect(wrapper.prop('data-tooltip')).toBe('Tooltip contents');
  });

  it('should not allow overriding all default properties', () => {
    // eslint-disable-next-line jsx-a11y/aria-role
    const wrapper = shallow(<TabList role="micro-tab" />);

    expect(wrapper.prop('role')).toBe('tablist');
  });
});
