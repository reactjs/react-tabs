/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Tab from '../Tab';

describe('<Tab />', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.error = error => {
      throw new Error(error);
    };
  });

  it('should have sane defaults', () => {
    const wrapper = shallow(<Tab />);

    expect(wrapper.hasClass('react-tabs__tab')).toBe(true);
    expect(wrapper.prop('role')).toBe('tab');
    expect(wrapper.prop('aria-selected')).toBe('false');
    expect(wrapper.prop('aria-disabled')).toBe('false');
    expect(wrapper.prop('aria-controls')).toBe(null);
    expect(wrapper.prop('id')).toBe(null);
    expect(wrapper.children().length).toBe(0);
  });

  it('should accept className', () => {
    const wrapper = shallow(<Tab className="foobar" />);

    expect(wrapper.hasClass('react-tabs__tab')).toBe(false);
    expect(wrapper.hasClass('foobar')).toBe(true);
  });

  it('should support being selected', () => {
    const wrapper = shallow(<Tab selected id="abcd" panelId="1234">Hello</Tab>);

    expect(wrapper.hasClass('react-tabs__tab')).toBe(true);
    expect(wrapper.hasClass('react-tabs__tab--selected')).toBe(true);
    expect(wrapper.prop('aria-selected')).toBe('true');
    expect(wrapper.prop('aria-disabled')).toBe('false');
    expect(wrapper.prop('aria-controls')).toBe('1234');
    expect(wrapper.prop('id')).toBe('abcd');
    expect(wrapper.text()).toBe('Hello');
  });

  it('should support being selected with custom class', () => {
    const wrapper = shallow(<Tab selected selectedClassName="cool" />);

    expect(wrapper.hasClass('react-tabs__tab')).toBe(true);
    expect(wrapper.hasClass('react-tabs__tab--selected')).toBe(false);
    expect(wrapper.hasClass('cool')).toBe(true);
    expect(wrapper.prop('aria-selected')).toBe('true');
  });

  it('should support being disabled', () => {
    const wrapper = shallow(<Tab disabled />);

    expect(wrapper.hasClass('react-tabs__tab')).toBe(true);
    expect(wrapper.hasClass('react-tabs__tab--disabled')).toBe(true);
    expect(wrapper.prop('aria-disabled')).toBe('true');
  });

  it('should support being disabled with custom class name', () => {
    const wrapper = shallow(<Tab disabled disabledClassName="coolDisabled" />);

    expect(wrapper.hasClass('react-tabs__tab')).toBe(true);
    expect(wrapper.hasClass('react-tabs__tab--disabled')).toBe(false);
    expect(wrapper.hasClass('coolDisabled')).toBe(true);
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
