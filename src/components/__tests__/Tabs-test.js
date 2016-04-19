/* global jest, describe, it, expect */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Tab from '../Tab';
import TabList from '../TabList';
import TabPanel from '../TabPanel';
import Tabs from '../Tabs';

function createTabs(props = {
  selectedIndex: 0,
  focus: false,
  onSelect: null,
  forceRenderTabPanel: false,
  className: null,
}) {
  return (
    <Tabs {...props}>
      <TabList>
        <Tab>Foo</Tab>
        <Tab>Bar</Tab>
        <Tab><a>Baz</a></Tab>
        <Tab disabled>Qux</Tab>
      </TabList>
      <TabPanel>Hello Foo</TabPanel>
      <TabPanel>Hello Bar</TabPanel>
      <TabPanel>Hello Baz</TabPanel>
      <TabPanel>Hello Qux</TabPanel>
    </Tabs>
  );
}

function assertTabSelected(wrapper, index) {
  const tab = wrapper.childAt(0).childAt(index);
  const panel = wrapper.childAt(index + 1);

  expect(tab.prop('selected')).toBe(true);
  expect(panel.prop('selected')).toBe(true);
}

describe('react-tabs', () => {
  describe('props', () => {
    it('should default to selectedIndex being 0', () => {
      const wrapper = shallow(createTabs());

      assertTabSelected(wrapper, 0);
    });

    it('should honor selectedIndex prop', () => {
      const wrapper = shallow(createTabs({ selectedIndex: 1 }));

      assertTabSelected(wrapper, 1);
    });

    it('should call onSelect when selection changes', () => {
      const called = { index: -1, last: -1 };
      const wrapper = shallow(createTabs({
        onSelect(index, last) {
          called.index = index;
          called.last = last;
        },
      }));

      wrapper.instance().setSelected(2);
      expect(called.index).toBe(2);
      expect(called.last).toBe(0);
    });

    it('should have a default className', () => {
      const wrapper = shallow(createTabs());

      expect(wrapper.hasClass('ReactTabs')).toBe(true);
      expect(wrapper.hasClass('react-tabs')).toBe(true);
    });

    it('should accept className', () => {
      const wrapper = shallow(createTabs({ className: 'foobar' }));

      expect(wrapper.hasClass('ReactTabs')).toBe(true);
      expect(wrapper.hasClass('react-tabs')).toBe(true);
      expect(wrapper.hasClass('foobar')).toBe(true);
    });
  });

  describe('child props', () => {
    it('should set disabled on disabled node', () => {
      const wrapper = mount(createTabs());
      const tablist = wrapper.childAt(0);

      expect(tablist.childAt(3).prop('disabled')).toBe(true);
    });

    it('should set ids correctly', () => {
      const wrapper = mount(createTabs());
      const tablist = wrapper.childAt(0);

      for (let i = 0, l = wrapper.instance().getTabsCount(); i < l; i++) {
        const tab = tablist.childAt(i);
        const panel = wrapper.childAt(i + 1);

        expect(tab.prop('id')).toBe(panel.prop('tabId'));
        expect(panel.prop('id')).toBe(tab.prop('panelId'));
      }
    });
  });

  describe('interaction', () => {
    it('should update selectedIndex when clicked', () => {
      const wrapper = mount(createTabs());
      wrapper.childAt(0).childAt(1).simulate('click');

      assertTabSelected(wrapper, 1);
    });

    it('should update selectedIndex when tab child is clicked', () => {
      const wrapper = mount(createTabs());
      const tablist = wrapper.childAt(0);
      tablist.childAt(2).first().simulate('click');

      assertTabSelected(wrapper, 2);
    });

    it('should not change selectedIndex when clicking a disabled tab', () => {
      const wrapper = mount(createTabs({ selectedIndex: 0 }));

      wrapper.childAt(0).childAt(3).simulate('click');
      assertTabSelected(wrapper, 0);
    });

    // TODO: Can't seem to make this fail when removing fix :`(
    // See https://github.com/rackt/react-tabs/pull/7
    // it('should preserve selectedIndex when typing', function () {
    //   let App = React.createClass({
    //     handleKeyDown: function () { this.forceUpdate(); },
    //     render: function () {
    //       return (
    //         <Tabs ref="tabs" selectedIndex={1}>
    //           <TabList>
    //             <Tab>First</Tab>
    //             <Tab>Second</Tab>
    //           </TabList>
    //           <TabPanel>1st</TabPanel>
    //           <TabPanel><input onKeyDown={this.handleKeyDown}/></TabPanel>
    //         </Tabs>
    //       );
    //     }
    //   });
    //
    //   let tabs = TestUtils.renderIntoDocument(<App/>).refs.tabs;
    //   let input = tabs.getDOMNode().querySelector('input');
    //
    //   input.focus();
    //   TestUtils.Simulate.keyDown(input, {
    //     keyCode: 'a'.charCodeAt()
    //   });
    //
    //   assertTabSelected(tabs, 1);
    // });
  });

  describe('performance', () => {
    it('should only render the active tab panel', () => {
      const wrapper = mount(createTabs());

      expect(wrapper.childAt(1).text()).toBe('Hello Foo');
      expect(wrapper.childAt(2).text()).toBe('');
      expect(wrapper.childAt(3).text()).toBe('');

      wrapper.childAt(0).childAt(1).simulate('click');

      expect(wrapper.childAt(1).text()).toBe('');
      expect(wrapper.childAt(2).text()).toBe('Hello Bar');
      expect(wrapper.childAt(3).text()).toBe('');

      wrapper.childAt(0).childAt(2).simulate('click');

      expect(wrapper.childAt(1).text()).toBe('');
      expect(wrapper.childAt(2).text()).toBe('');
      expect(wrapper.childAt(3).text()).toBe('Hello Baz');
    });

    it('should render all tabs if forceRenderTabPanel is true', () => {
      const wrapper = mount(createTabs({ forceRenderTabPanel: true }));

      expect(wrapper.childAt(1).text()).toBe('Hello Foo');
      expect(wrapper.childAt(2).text()).toBe('Hello Bar');
      expect(wrapper.childAt(3).text()).toBe('Hello Baz');
    });
  });

  describe('validation', () => {
    it('should result with warning when tabs/panels are imbalanced', () => {
      const wrapper = shallow(
        <Tabs>
          <TabList>
            <Tab>Foo</Tab>
          </TabList>
        </Tabs>
      );

      const result = Tabs.propTypes.children(wrapper.props(), 'children', 'Tabs');
      expect(result instanceof Error).toBe(true);
    });

    it('should result with a warning when wrong element is found', () => {
      const wrapper = shallow(
        <Tabs>
          <TabList>
            <Tab />
            <div />
          </TabList>
          <TabPanel />
        </Tabs>
      );

      const result = Tabs.propTypes.children(wrapper.props(), 'children', 'Tabs');
      expect(result instanceof Error).toBe(true);
    });

    it('should be okay with rendering without any children', () => {
      expect(() => shallow(<Tabs />)).not.toThrow();
    });

    it('should be okay with rendering just TabList', () => {
      expect(() => shallow(
        <Tabs>
          <TabList />
        </Tabs>
      )).not.toThrow();
    });

    it('should gracefully render null', () => {
      expect(() => shallow(
        <Tabs>
          <TabList>
            <Tab>Tab A</Tab>
            {false && <Tab>Tab B</Tab>}
          </TabList>
          <TabPanel>Content A</TabPanel>
          {false && <TabPanel>Content B</TabPanel>}
        </Tabs>
      )).not.toThrow();
    });

    it('should support nested tabs', () => {
      const wrapper = mount(
        <Tabs className="first">
          <TabList>
            <Tab />
            <Tab />
          </TabList>
          <TabPanel>
            <Tabs className="second">
              <TabList>
                <Tab />
                <Tab />
              </TabList>
              <TabPanel />
              <TabPanel />
            </Tabs>
          </TabPanel>
          <TabPanel />
        </Tabs>
      );

      const innerTabs = wrapper.childAt(1).childAt(0);

      innerTabs.childAt(0).childAt(1).simulate('click');

      assertTabSelected(wrapper, 0);
      assertTabSelected(innerTabs, 1);
    });
  });

  it('should pass through custom properties', () => {
    const wrapper = shallow(<Tabs data-tooltip="Tooltip contents" />);

    expect(wrapper.prop('data-tooltip')).toBe('Tooltip contents');
  });
});
