/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import TabPanel from '../TabPanel';

describe('<TabPanel />', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.error = error => {
      throw new Error(error);
    };
  });

  it('should have sane defaults', () => {
    const wrapper = shallow(<TabPanel>Hola</TabPanel>);

    expect(wrapper.hasClass('ReactTabs__TabPanel')).toBe(true);
    expect(wrapper.prop('role')).toBe('tabpanel');
    expect(wrapper.children().length).toBe(0);
  });

  it('should render when selected', () => {
    const wrapper = shallow(<TabPanel selected>Hola</TabPanel>);

    expect(wrapper.children().length).toBe(1);
  });

  it('should render when forced', () => {
    const wrapper = shallow(<TabPanel forceRender>Hola</TabPanel>);

    expect(wrapper.children().length).toBe(1);
  });

  it('should accept className', () => {
    const wrapper = shallow(<TabPanel className="foobar" />);

    expect(wrapper.hasClass('ReactTabs__TabPanel')).toBe(false);
    expect(wrapper.hasClass('foobar')).toBe(true);
  });

  it('should support being selected', () => {
    const wrapper = shallow(
      <TabPanel selected id="abcd" tabId="1234">Hola</TabPanel>,
    );

    expect(wrapper.hasClass('ReactTabs__TabPanel')).toBe(true);
    expect(wrapper.hasClass('ReactTabs__TabPanel--selected')).toBe(true);
    expect(wrapper.prop('aria-labelledby')).toBe('1234');
    expect(wrapper.prop('id')).toBe('abcd');
    expect(wrapper.text()).toBe('Hola');
  });

  it('should support being selected with custom class name', () => {
    const wrapper = shallow(
      <TabPanel selected id="abcd" tabId="1234" selectedClassName="selected">
        Hola
      </TabPanel>,
    );

    expect(wrapper.hasClass('ReactTabs__TabPanel')).toBe(true);
    expect(wrapper.hasClass('ReactTabs__TabPanel--selected')).toBe(false);
    expect(wrapper.hasClass('selected')).toBe(true);
    expect(wrapper.prop('aria-labelledby')).toBe('1234');
    expect(wrapper.prop('id')).toBe('abcd');
    expect(wrapper.text()).toBe('Hola');
  });

  it('should pass through custom properties', () => {
    const wrapper = shallow(<TabPanel data-tooltip="Tooltip contents" />);

    expect(wrapper.prop('data-tooltip')).toBe('Tooltip contents');
  });

  it('should not allow overriding all default properties', () => {
    // eslint-disable-next-line jsx-a11y/aria-role
    const wrapper = shallow(<TabPanel role="micro-tab" />);

    expect(wrapper.prop('role')).toBe('tabpanel');
  });
});
