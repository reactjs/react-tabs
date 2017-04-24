/* eslint-env jest */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Tab from '../Tab';
import TabList from '../TabList';
import TabPanel from '../TabPanel';
import Tabs from '../Tabs';
import { reset as resetIdCounter } from '../../helpers/uuid';

function createTabs(props = {}) {
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

describe('<Tabs />', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.error = (error) => {
      throw new Error(error);
    };
  });

  describe('props', () => {
    test('should default to selectedIndex being 0', () => {
      const wrapper = mount(createTabs());

      assertTabSelected(wrapper, 0);
    });

    test('should honor positive defaultIndex prop', () => {
      const wrapper = mount(createTabs({ defaultIndex: 1 }));

      assertTabSelected(wrapper, 1);
    });

    test('should honor negative defaultIndex prop', () => {
      const wrapper = mount(createTabs({ defaultIndex: -1 }));
      const tablist = wrapper.childAt(0);

      for (let i = 0, l = tablist.children.length; i < l; i++) {
        const tab = tablist.childAt(i);
        const panel = wrapper.childAt(i + 1);

        expect(tab.prop('selected')).toBe(false);
        expect(panel.prop('selected')).toBe(false);
      }
    });

    test('should call onSelect when selection changes', () => {
      const called = { index: -1, last: -1 };
      const wrapper = mount(createTabs({
        onSelect(index, last) {
          called.index = index;
          called.last = last;
        },
      }));

      wrapper.childAt(0).childAt(1).simulate('click');

      expect(called.index).toBe(1);
      expect(called.last).toBe(0);
    });

    test('should have a default className', () => {
      const wrapper = mount(createTabs());

      expect(wrapper.hasClass('ReactTabs')).toBe(true);
    });

    test('should accept className', () => {
      const wrapper = mount(createTabs({ className: 'foobar' }));

      expect(wrapper.hasClass('ReactTabs')).toBe(false);
      expect(wrapper.hasClass('foobar')).toBe(true);
    });
  });

  describe('child props', () => {
    test('should set disabled on disabled node', () => {
      const wrapper = mount(createTabs());
      const tablist = wrapper.childAt(0);

      expect(tablist.childAt(3).prop('disabled')).toBe(true);
    });

    test('should set ids correctly', () => {
      const wrapper = mount(createTabs());
      const tablist = wrapper.childAt(0);

      for (let i = 0, l = tablist.children.length; i < l; i++) {
        const tab = tablist.childAt(i);
        const panel = wrapper.childAt(i + 1);

        expect(tab.prop('id')).toBe(panel.prop('tabId'));
        expect(panel.prop('id')).toBe(tab.prop('panelId'));
      }
    });

    test('should reset ids correctly', () => {
      mount(createTabs());

      resetIdCounter();

      const wrapper = mount(createTabs());
      const tablist = wrapper.childAt(0);

      for (let i = 0, j = 0, l = tablist.children.length; i < l; i++, j += 2) {
        const tab = tablist.childAt(i);
        const panel = wrapper.childAt(i + 1);

        expect(tab.prop('id')).toBe(`react-tabs-${j}`);
        expect(panel.prop('id')).toBe(`react-tabs-${j + 1}`);
      }
    });
  });

  describe('interaction', () => {
    test('should update selectedIndex when clicked', () => {
      const wrapper = mount(createTabs());
      wrapper.childAt(0).childAt(1).simulate('click');

      assertTabSelected(wrapper, 1);
    });

    test('should update selectedIndex when tab child is clicked', () => {
      const wrapper = mount(createTabs());
      const tablist = wrapper.childAt(0);
      tablist.childAt(2).first().simulate('click');

      assertTabSelected(wrapper, 2);
    });

    test('should not change selectedIndex when clicking a disabled tab', () => {
      const wrapper = mount(createTabs({ defaultIndex: 0 }));

      wrapper.childAt(0).childAt(3).simulate('click');
      assertTabSelected(wrapper, 0);
    });
  });

  describe('performance', () => {
    test('should only render the selected tab panel', () => {
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

    test('should render all tabs if forceRenderTabPanel is true', () => {
      const wrapper = mount(createTabs({ forceRenderTabPanel: true }));

      expect(wrapper.childAt(1).text()).toBe('Hello Foo');
      expect(wrapper.childAt(2).text()).toBe('Hello Bar');
      expect(wrapper.childAt(3).text()).toBe('Hello Baz');
    });

    test('should not clone non tabs element', () => {
      class Demo extends React.Component {
        render() {
          const arbitrary1 = <div ref="arbitrary1">One</div>;  // eslint-disable-line react/no-string-refs
          const arbitrary2 = <span ref="arbitrary2">Two</span>;  // eslint-disable-line react/no-string-refs
          const arbitrary3 = <small ref="arbitrary3">Three</small>;  // eslint-disable-line react/no-string-refs

          return (<Tabs>
            <TabList>
              {arbitrary1}
              <Tab>Foo</Tab>
              {arbitrary2}
              <Tab>Bar</Tab>
              {arbitrary3}
            </TabList>

            <TabPanel>Hello Baz</TabPanel>
            <TabPanel>Hello Faz</TabPanel>
          </Tabs>);
        }
      }

      const wrapper = mount(<Demo />);

      expect(wrapper.ref('arbitrary1').text()).toBe('One');
      expect(wrapper.ref('arbitrary2').text()).toBe('Two');
      expect(wrapper.ref('arbitrary3').text()).toBe('Three');
    });
  });

  describe('validation', () => {
    test('should result with warning when tabs/panels are imbalanced', () => {
      const oldConsoleError = console.error; // eslint-disable-line no-console
      console.error = () => {}; // eslint-disable-line no-console
      const wrapper = shallow(
        <Tabs>
          <TabList>
            <Tab>Foo</Tab>
          </TabList>
        </Tabs>,
      );
      console.error = oldConsoleError; // eslint-disable-line no-console

      const result = Tabs.propTypes.children(wrapper.props(), 'children', 'Tabs');
      expect(result instanceof Error).toBe(true);
    });

    test('should result with warning when onSelect missing when selectedIndex set', () => {
      const oldConsoleError = console.error; // eslint-disable-line no-console
      const catchedErrors = [];
      console.error = (error) => { catchedErrors.push(error); }; // eslint-disable-line no-console
      shallow(
        <Tabs selectedIndex={1}>
          <TabList>
            <Tab>Foo</Tab>
          </TabList>
          <TabPanel>Foo</TabPanel>
        </Tabs>,
      );
      console.error = oldConsoleError; // eslint-disable-line no-console

      const expectedMessage = 'The prop `onSelect` is marked as required in `Tabs`, but its value is `undefined` or `null`.';
      expect(catchedErrors.some(msg => msg.indexOf(expectedMessage) > -1)).toBe(true);
    });

    test('should result with warning when defaultIndex and selectedIndex set', () => {
      const oldConsoleError = console.error; // eslint-disable-line no-console
      const catchedErrors = [];
      console.error = (error) => { catchedErrors.push(error); }; // eslint-disable-line no-console
      shallow(
        <Tabs selectedIndex={1} defaultIndex={1}>
          <TabList>
            <Tab>Foo</Tab>
          </TabList>
          <TabPanel>Foo</TabPanel>
        </Tabs>,
      );
      console.error = oldConsoleError; // eslint-disable-line no-console

      const expectedMessage = 'The prop `selectedIndex` cannot be used together with `defaultIndex` in `Tabs`.';
      expect(catchedErrors.some(msg => msg.indexOf(expectedMessage) > -1)).toBe(true);
    });

    test(`should result with warning when tabs/panels are imbalanced and
        it should ignore non tab children`, () => {
      const oldConsoleError = console.error; // eslint-disable-line no-console
      console.error = () => {}; // eslint-disable-line no-console
      const wrapper = shallow(
        <Tabs>
          <TabList>
            <Tab>Foo</Tab>
            <div>+</div>
          </TabList>

          <TabPanel>Hello Foo</TabPanel>
          <TabPanel>Hello Bar</TabPanel>
        </Tabs>,
      );
      console.error = oldConsoleError; // eslint-disable-line no-console

      const result = Tabs.propTypes.children(wrapper.props(), 'children', 'Tabs');
      expect(result instanceof Error).toBe(true);
    });

    test('should allow random order for elements', () => {
      const wrapper = mount(
        <Tabs forceRenderTabPanel>
          <TabPanel>Hello Foo</TabPanel>
          <TabList>
            <Tab>Foo</Tab>
            <Tab>Bar</Tab>
          </TabList>
          <TabPanel>Hello Bar</TabPanel>
        </Tabs>,
      );

      expect(wrapper.childAt(0).text()).toBe('Hello Foo');
      expect(wrapper.childAt(2).text()).toBe('Hello Bar');
    });

    test('should not throw a warning when wrong element is found', () => {
      const wrapper = shallow(
        <Tabs>
          <TabList>
            <Tab />
            <div />
          </TabList>
          <TabPanel />
        </Tabs>,
      );

      const result = Tabs.propTypes.children(wrapper.props(), 'children', 'Tabs');
      expect(result instanceof Error).toBe(false);
    });

    test('should be okay with rendering without any children', () => {
      expect(() => shallow(<Tabs />)).not.toThrow();
    });

    test('should be okay with rendering just TabList', () => {
      expect(() => shallow(
        <Tabs>
          <TabList />
        </Tabs>,
      )).not.toThrow();
    });

    test('should gracefully render null', () => {
      expect(() => shallow(
        <Tabs>
          <TabList>
            <Tab>Tab A</Tab>
            {false && <Tab>Tab B</Tab>}
          </TabList>
          <TabPanel>Content A</TabPanel>
          {false && <TabPanel>Content B</TabPanel>}
        </Tabs>,
      )).not.toThrow();
    });

    test('should support nested tabs', () => {
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
        </Tabs>,
      );

      const innerTabs = wrapper.childAt(1).childAt(0);

      innerTabs.childAt(0).childAt(1).simulate('click');

      assertTabSelected(wrapper, 0);
      assertTabSelected(innerTabs, 1);
    });
  });

  test('should pass through custom properties', () => {
    const wrapper = shallow(<Tabs data-tooltip="Tooltip contents" />);

    expect(wrapper.prop('data-tooltip')).toBe('Tooltip contents');
  });

  test('should not add known props to dom', () => {
    const wrapper = shallow(<Tabs defaultIndex={3} />);

    expect(wrapper.prop('defaultIndex')).toBe(undefined);
  });

  test('should cancel if event handler returns false', () => {
    const wrapper = mount(createTabs({ onSelect: () => false }));

    assertTabSelected(wrapper, 0);

    wrapper.childAt(0).childAt(1).simulate('click');
    assertTabSelected(wrapper, 0);

    wrapper.childAt(0).childAt(2).simulate('click');
    assertTabSelected(wrapper, 0);
  });

  test('should switch tabs if setState is called within onSelect', () => {
    class Wrap extends React.Component {
      handleSelect = () => this.setState({ foo: 'bar' });
      render() { return createTabs({ onSelect: this.handleSelect }); }
    }

    const wrapper = mount(<Wrap />);

    wrapper.childAt(0).childAt(1).simulate('click');
    assertTabSelected(wrapper, 1);

    wrapper.childAt(0).childAt(2).simulate('click');
    assertTabSelected(wrapper, 2);
  });
});
