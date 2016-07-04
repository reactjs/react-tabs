/* global jest, describe, it, expect */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Tab from '../Tab';
import TabList from '../TabList';
import Tabs from '../Tabs';

function hasClassAt(wrapper, index, className) {
  return wrapper.childAt(index).find('li').hasClass(className);
}

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

  it('should retain the default classnames for active and disabled tab', () => {
    const wrapper = mount(
      <Tabs selectedIndex={0}>
        <TabList>
          <Tab>Foo</Tab>
          <Tab disabled>Bar</Tab>
        </TabList>
      </Tabs>
    );

    const tabsList = wrapper.childAt(0);
    expect(hasClassAt(tabsList, 0, 'ReactTabs__Tab--selected')).toBe(true);
    expect(hasClassAt(tabsList, 1, 'ReactTabs__Tab--disabled')).toBe(true);
  });

  it('should display the custom classnames for active and disabled tab', () => {
    const wrapper = mount(
      <Tabs selectedIndex={0}>
        <TabList activeTabClassName="active" disabledTabClassName="disabled">
          <Tab>Foo</Tab>
          <Tab disabled>Bar</Tab>
        </TabList>
      </Tabs>
    );

    const tabsList = wrapper.childAt(0);
    expect(hasClassAt(tabsList, 0, 'ReactTabs__Tab--selected')).toBe(false);
    expect(hasClassAt(tabsList, 1, 'ReactTabs__Tab--disabled')).toBe(false);

    expect(hasClassAt(tabsList, 0, 'active')).toBe(true);
    expect(hasClassAt(tabsList, 1, 'disabled')).toBe(true);
  });
});
