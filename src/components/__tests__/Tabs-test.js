/* eslint-env jest */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Tab from '../Tab';
import TabList from '../TabList';
import TabPanel from '../TabPanel';
import Tabs from '../Tabs';
import { reset as resetIdCounter } from '../../helpers/uuid';

function expectToMatchSnapshot(component) {
  expect(renderer.create(component).toJSON()).toMatchSnapshot();
}

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
  beforeEach(() => resetIdCounter());

  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.error = error => {
      throw new Error(error);
    };
  });

  describe('props', () => {
    test('should have sane defaults', () => {
      expectToMatchSnapshot(createTabs());
    });

    test('should honor positive defaultIndex prop', () => {
      expectToMatchSnapshot(createTabs({ defaultIndex: 1 }));
    });

    test('should honor negative defaultIndex prop', () => {
      expectToMatchSnapshot(createTabs({ defaultIndex: -1 }));
    });

    test('should call onSelect when selection changes', () => {
      const called = { index: -1, last: -1 };
      const wrapper = mount(
        createTabs({
          onSelect(index, last) {
            called.index = index;
            called.last = last;
          },
        }),
      );

      wrapper.childAt(0).childAt(1).simulate('click');

      expect(called.index).toBe(1);
      expect(called.last).toBe(0);
    });

    test('should accept className', () => {
      expectToMatchSnapshot(createTabs({ className: 'foobar' }));
    });
  });

  describe('child props', () => {
    test('should reset ids correctly', () => {
      expectToMatchSnapshot(createTabs());

      resetIdCounter();

      expectToMatchSnapshot(createTabs());
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
      expectToMatchSnapshot(createTabs({ forceRenderTabPanel: true }));
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

    test('should result with warning when tab outside of tablist', () => {
      const oldConsoleError = console.error; // eslint-disable-line no-console
      console.error = () => {}; // eslint-disable-line no-console
      const wrapper = shallow(
        <Tabs>
          <TabList>
            <Tab>Foo</Tab>
          </TabList>
          <Tab>Foo</Tab>
          <TabPanel />
          <TabPanel />
        </Tabs>,
      );
      console.error = oldConsoleError; // eslint-disable-line no-console

      const result = Tabs.propTypes.children(wrapper.props(), 'children', 'Tabs');
      expect(result instanceof Error).toBe(true);
    });

    test('should result with warning when multiple tablist components exist', () => {
      const oldConsoleError = console.error; // eslint-disable-line no-console
      console.error = () => {}; // eslint-disable-line no-console
      const wrapper = shallow(
        <Tabs>
          <TabList>
            <Tab>Foo</Tab>
          </TabList>
          <TabList>
            <Tab>Foo</Tab>
          </TabList>
          <TabPanel />
          <TabPanel />
        </Tabs>,
      );
      console.error = oldConsoleError; // eslint-disable-line no-console

      const result = Tabs.propTypes.children(wrapper.props(), 'children', 'Tabs');
      expect(result instanceof Error).toBe(true);
    });

    test('should result with warning when onSelect missing when selectedIndex set', () => {
      const oldConsoleError = console.error; // eslint-disable-line no-console
      const catchedErrors = [];
      // eslint-disable-next-line no-console
      console.error = error => {
        catchedErrors.push(error);
      };
      shallow(
        <Tabs selectedIndex={1}>
          <TabList>
            <Tab>Foo</Tab>
          </TabList>
          <TabPanel>Foo</TabPanel>
        </Tabs>,
      );
      console.error = oldConsoleError; // eslint-disable-line no-console

      const expectedMessage =
        'The prop `onSelect` is marked as required in `Tabs`, but its value is `undefined` or `null`.';
      expect(catchedErrors.some(msg => msg.indexOf(expectedMessage) > -1)).toBe(true);
    });

    test('should result with warning when defaultIndex and selectedIndex set', () => {
      const oldConsoleError = console.error; // eslint-disable-line no-console
      const catchedErrors = [];
      // eslint-disable-next-line no-console
      console.error = error => {
        catchedErrors.push(error);
      };
      shallow(
        <Tabs selectedIndex={1} defaultIndex={1}>
          <TabList>
            <Tab>Foo</Tab>
          </TabList>
          <TabPanel>Foo</TabPanel>
        </Tabs>,
      );
      console.error = oldConsoleError; // eslint-disable-line no-console

      const expectedMessage =
        'The prop `selectedIndex` cannot be used together with `defaultIndex` in `Tabs`.';
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
      expectToMatchSnapshot(
        <Tabs forceRenderTabPanel>
          <TabPanel>Hello Foo</TabPanel>
          <TabList>
            <Tab>Foo</Tab>
            <Tab>Bar</Tab>
          </TabList>
          <TabPanel>Hello Bar</TabPanel>
        </Tabs>,
      );
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
      expect(() =>
        shallow(
          <Tabs>
            <TabList />
          </Tabs>,
        ),
      ).not.toThrow();
    });

    test('should gracefully render null', () => {
      expect(() =>
        shallow(
          <Tabs>
            <TabList>
              <Tab>Tab A</Tab>
              {false && <Tab>Tab B</Tab>}
            </TabList>
            <TabPanel>Content A</TabPanel>
            {false && <TabPanel>Content B</TabPanel>}
          </Tabs>,
        ),
      ).not.toThrow();
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

    test('should allow other DOM nodes', () => {
      expectToMatchSnapshot(
        <Tabs>
          <div id="tabs-nav-wrapper">
            <button>Left</button>
            <div className="tabs-container">
              <TabList>
                <Tab />
                <Tab />
              </TabList>
            </div>
            <button>Right</button>
          </div>
          <div className="tab-panels">
            <TabPanel />
            <TabPanel />
          </div>
        </Tabs>,
      );
    });
  });

  test('should pass through custom properties', () => {
    expectToMatchSnapshot(<Tabs data-tooltip="Tooltip contents" />);
  });

  test('should not add known props to dom', () => {
    expectToMatchSnapshot(<Tabs defaultIndex={3} />);
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
      render() {
        return createTabs({ onSelect: this.handleSelect });
      }
    }

    const wrapper = mount(<Wrap />);

    wrapper.childAt(0).childAt(1).simulate('click');
    assertTabSelected(wrapper, 1);

    wrapper.childAt(0).childAt(2).simulate('click');
    assertTabSelected(wrapper, 2);
  });
});
