/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Tab from '../Tab';

describe('<Tab />', () => {
  it('should have sane defaults', () => {
    const wrapper = shallow(<Tab />);

    expect(wrapper.hasClass('ReactTabs__Tab')).toBe(true);
    expect(wrapper.prop('role')).toBe('tab');
    expect(wrapper.prop('aria-selected')).toBe('false');
    expect(wrapper.prop('aria-disabled')).toBe('false');
    expect(wrapper.prop('aria-controls')).toBe(null);
    expect(wrapper.prop('id')).toBe(null);
    expect(wrapper.children().length).toBe(0);
  });

  it('should accept className', () => {
    const wrapper = shallow(<Tab className="foobar" />);

    expect(wrapper.hasClass('ReactTabs__Tab')).toBe(true);
    expect(wrapper.hasClass('foobar')).toBe(true);
  });

  it('should support being selected', () => {
    const wrapper = shallow(<Tab selected id="abcd" panelId="1234">Hello</Tab>);

    expect(wrapper.hasClass('ReactTabs__Tab')).toBe(true);
    expect(wrapper.hasClass('ReactTabs__Tab--selected')).toBe(true);
    expect(wrapper.prop('aria-selected')).toBe('true');
    expect(wrapper.prop('aria-disabled')).toBe('false');
    expect(wrapper.prop('aria-controls')).toBe('1234');
    expect(wrapper.prop('id')).toBe('abcd');
    expect(wrapper.text()).toBe('Hello');
  });

  it('should support being disabled', () => {
    const wrapper = shallow(<Tab disabled />);

    expect(wrapper.hasClass('ReactTabs__Tab')).toBe(true);
    expect(wrapper.hasClass('ReactTabs__Tab--disabled')).toBe(true);
    expect(wrapper.prop('aria-disabled')).toBe('true');
  });

  it('should pass through custom properties', () => {
    const wrapper = shallow(<Tab data-tooltip="Tooltip contents" />);

    expect(wrapper.prop('data-tooltip')).toBe('Tooltip contents');
  });

  it('should not allow overriding all default properties', () => {
    // eslint-disable-next-line jsx-a11y/aria-role
    const wrapper = shallow(<Tab role="micro-tab" />);

    expect(wrapper.prop('role')).toBe('tab');
  });
});
