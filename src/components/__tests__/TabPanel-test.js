/* global jest, describe, it, expect */
import React from 'react';
import { shallow } from 'enzyme';
import TabPanel from '../TabPanel';

describe('Tab', () => {
  it('should have sane defaults', () => {
    const wrapper = shallow(<TabPanel>Hola</TabPanel>);

    expect(wrapper.hasClass('ReactTabs__TabPanel')).toBe(true);
    expect(wrapper.prop('role')).toBe('tabpanel');
    expect(wrapper.prop('aria-labelledby')).toBe(null);
    expect(wrapper.prop('id')).toBe(null);
    expect(wrapper.children().length).toBe(0);
    expect(wrapper.children().length).toBe(0);
    expect(wrapper.prop('style')).not.toBe(null);
    expect(wrapper.prop('style').display).toBe('none');
  });

  it('should accept className', () => {
    const wrapper = shallow(<TabPanel className="foobar" />);

    expect(wrapper.hasClass('ReactTabs__TabPanel')).toBe(true);
    expect(wrapper.hasClass('foobar')).toBe(true);
  });

  it('should support being selected', () => {
    const wrapper = shallow(<TabPanel selected id="abcd" tabId="1234">Hola</TabPanel>);

    expect(wrapper.hasClass('ReactTabs__TabPanel')).toBe(true);
    expect(wrapper.hasClass('ReactTabs__TabPanel--selected')).toBe(true);
    expect(wrapper.prop('aria-labelledby')).toBe('1234');
    expect(wrapper.prop('id')).toBe('abcd');
    expect(wrapper.text()).toBe('Hola');
    expect(wrapper.prop('style')).not.toBe(null);
    expect(wrapper.prop('style').display).toBe(null);
  });
});

