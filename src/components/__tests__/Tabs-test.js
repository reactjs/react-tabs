/* eslint-env jest */
import { format } from 'util';
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Tab from '../Tab';
import TabList from '../TabList';
import TabPanel from '../TabPanel';
import Tabs from '../Tabs';
import { reset as resetIdCounter } from '../../helpers/uuid';
import {
  TabListWrapper,
  TabWrapper,
  TabPanelWrapper,
} from './helpers/higherOrder';

function expectToMatchSnapshot(component) {
  expect(render(component).container.firstChild).toMatchSnapshot();
}

function createTabs(props = {}) {
  return (
    <Tabs {...props}>
      <TabList>
        <Tab data-testid="tab1">Tab1</Tab>
        <Tab data-testid="tab2">Tab2</Tab>
        <Tab data-testid="tab3">
          <a href="a">Tab3</a>
        </Tab>
        <Tab data-testid="tab4" disabled>
          Tab4
        </Tab>
      </TabList>
      <TabPanel data-testid="panel1">Hello Tab1</TabPanel>
      <TabPanel data-testid="panel2">Hello Tab2</TabPanel>
      <TabPanel data-testid="panel3">Hello Tab3</TabPanel>
      <TabPanel data-testid="panel4">Hello Tab4</TabPanel>
    </Tabs>
  );
}

function assertTabSelected(tabNo, node = screen) {
  const tab = node.getByTestId(`tab${tabNo}`);
  const panel = node.getByTestId(`panel${tabNo}`);

  expect(tab).toHaveAttribute('aria-selected', 'true');
  expect(panel).toHaveTextContent(`Hello Tab${tabNo}`);
}

describe('<Tabs />', () => {
  beforeEach(() => resetIdCounter());

  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.error = (error, ...args) => {
      if (args.length > 0 && typeof error === 'string') {
        if (error.endsWith('%s%s')) {
          throw new Error(format(error.slice(0, -2), ...args.slice(0, -1)));
        }
        throw new Error(format(error, ...args));
      }
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
      render(
        createTabs({
          onSelect(index, last) {
            called.index = index;
            called.last = last;
          },
        }),
      );

      userEvent.click(screen.getByTestId('tab2'));

      expect(called.index).toBe(1);
      expect(called.last).toBe(0);
    });

    test('should accept className', () => {
      expectToMatchSnapshot(createTabs({ className: 'foobar' }));
    });

    test('should accept domRef', () => {
      let domNode;
      render(
        createTabs({
          domRef: (node) => {
            domNode = node;
          },
        }),
      );

      expect(domNode).not.toBeUndefined();
      expect(domNode.className).toBe('react-tabs');
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
    describe('mouse', () => {
      test('should update selectedIndex when clicked', () => {
        render(createTabs());
        userEvent.click(screen.getByTestId('tab2'));

        assertTabSelected(2);
      });

      test('should update selectedIndex when tab child is clicked', () => {
        render(createTabs());
        userEvent.click(screen.getByTestId('tab3'));

        assertTabSelected(3);
      });

      test('should not change selectedIndex when clicking a disabled tab', () => {
        render(createTabs({ defaultIndex: 0 }));
        userEvent.click(screen.getByTestId('tab4'));

        assertTabSelected(1);
      });
    });

    describe('keyboard', () => {
      test('should update selectedIndex when arrow right key pressed', () => {
        render(createTabs());
        const element = screen.getByTestId('tab1');
        userEvent.click(element);
        userEvent.type(element, '{arrowright}');

        assertTabSelected(2);
      });

      test('should update selectedIndex when arrow left key pressed (RTL)', () => {
        render(createTabs({ direction: 'rtl' }));
        const element = screen.getByTestId('tab1');
        userEvent.click(element);
        userEvent.type(element, '{arrowleft}');

        assertTabSelected(2);
      });

      test.skip('should not change selectedIndex when arrow left key pressed on a disabled tab', () => {
        render(createTabs());
        const element = screen.getByTestId('tab4');
        userEvent.click(element);
        userEvent.type(element, '{arrowleft}');

        assertTabSelected(1);
      });
    });
  });

  describe('performance', () => {
    test('should only render the selected tab panel', () => {
      render(createTabs());
      const tabPanels = screen.getAllByRole('tabpanel');

      expect(tabPanels[0]).toHaveTextContent('Hello Tab1');
      expect(tabPanels[1]).toHaveTextContent('');
      expect(tabPanels[2]).toHaveTextContent('');
      expect(tabPanels[3]).toHaveTextContent('');

      userEvent.click(screen.getByTestId('tab2'));

      expect(tabPanels[0]).toHaveTextContent('');
      expect(tabPanels[1]).toHaveTextContent('Hello Tab2');
      expect(tabPanels[2]).toHaveTextContent('');
      expect(tabPanels[3]).toHaveTextContent('');

      userEvent.click(screen.getByTestId('tab3'));

      expect(tabPanels[0]).toHaveTextContent('');
      expect(tabPanels[1]).toHaveTextContent('');
      expect(tabPanels[2]).toHaveTextContent('Hello Tab3');
      expect(tabPanels[3]).toHaveTextContent('');
    });

    test('should render all tabs if forceRenderTabPanel is true', () => {
      expectToMatchSnapshot(createTabs({ forceRenderTabPanel: true }));
    });
  });

  describe('validation', () => {
    test('should result with warning when tabs/panels are imbalanced', () => {
      expect(() =>
        render(
          <Tabs>
            <TabList>
              <Tab>Foo</Tab>
            </TabList>
          </Tabs>,
        ),
      ).toThrowErrorMatchingSnapshot();
    });

    test('should result with warning when tab outside of tablist', () => {
      expect(() =>
        render(
          <Tabs>
            <TabList>
              <Tab>Foo</Tab>
            </TabList>
            <Tab>Foo</Tab>
            <TabPanel />
            <TabPanel />
          </Tabs>,
        ),
      ).toThrowErrorMatchingSnapshot();
    });

    test('should result with warning when multiple tablist components exist', () => {
      expect(() =>
        render(
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
        ),
      ).toThrowErrorMatchingSnapshot();
    });

    test('should result with warning when onSelect missing when selectedIndex set', () => {
      expect(() =>
        render(
          <Tabs selectedIndex={1}>
            <TabList>
              <Tab>Foo</Tab>
            </TabList>
            <TabPanel>Foo</TabPanel>
          </Tabs>,
        ),
      ).toThrowErrorMatchingSnapshot();
    });

    test('should result with warning when defaultIndex and selectedIndex set', () => {
      expect(() =>
        render(
          <Tabs selectedIndex={1} defaultIndex={1}>
            <TabList>
              <Tab>Foo</Tab>
            </TabList>
            <TabPanel>Foo</TabPanel>
          </Tabs>,
        ),
      ).toThrowErrorMatchingSnapshot();
    });

    test('should result with warning when tabs/panels are imbalanced and it should ignore non tab children', () => {
      expect(() =>
        render(
          <Tabs>
            <TabList>
              <Tab>Foo</Tab>
              <div>+</div>
            </TabList>

            <TabPanel>Hello Foo</TabPanel>
            <TabPanel>Hello Bar</TabPanel>
          </Tabs>,
        ),
      ).toThrowErrorMatchingSnapshot();
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
      expectToMatchSnapshot(
        <Tabs>
          <TabList>
            <Tab />
            <div />
          </TabList>
          <TabPanel />
        </Tabs>,
      );
    });

    test('should be okay with rendering without any children', () => {
      expectToMatchSnapshot(<Tabs />);
    });

    test('should be okay with rendering just TabList', () => {
      expectToMatchSnapshot(
        <Tabs>
          <TabList />
        </Tabs>,
      );
    });

    test('should gracefully render null', () => {
      expectToMatchSnapshot(
        <Tabs>
          <TabList>
            <Tab>Tab A</Tab>
            {false && <Tab>Tab B</Tab>}
          </TabList>
          <TabPanel>Content A</TabPanel>
          {false && <TabPanel>Content B</TabPanel>}
        </Tabs>,
      );
    });

    test('should support nested tabs', () => {
      render(
        <Tabs data-testid="first">
          <TabList>
            <Tab data-testid="tab1" />
            <Tab />
          </TabList>
          <TabPanel data-testid="panel1">
            Hello Tab1
            <Tabs data-testid="second">
              <TabList>
                <Tab />
                <Tab data-testid="tab2" />
              </TabList>
              <TabPanel />
              <TabPanel data-testid="panel2">Hello Tab2</TabPanel>
            </Tabs>
          </TabPanel>
          <TabPanel />
        </Tabs>,
      );

      userEvent.click(within(screen.getByTestId('second')).getByTestId('tab2'));

      assertTabSelected(1);
      assertTabSelected(2, within(screen.getByTestId('second')));
    });

    test('should allow other DOM nodes', () => {
      expectToMatchSnapshot(
        <Tabs>
          <div id="tabs-nav-wrapper">
            <button type="button">Left</button>
            <div className="tabs-container">
              <TabList>
                <Tab />
                <Tab />
              </TabList>
            </div>
            <button type="button">Right</button>
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
    render(createTabs({ onSelect: () => false }));

    assertTabSelected(1);

    userEvent.click(screen.getByTestId('tab2'));
    assertTabSelected(1);

    userEvent.click(screen.getByTestId('tab3'));
    assertTabSelected(1);
  });

  test('should trigger onSelect handler when clicking', () => {
    let wasClicked = false;
    render(
      createTabs({
        onSelect: () => {
          wasClicked = true;
        },
      }),
    );

    assertTabSelected(1);

    userEvent.click(screen.getByTestId('tab2'));
    assertTabSelected(2);
    expect(wasClicked).toBe(true);
  });

  test('should trigger onSelect handler when clicking on open tab', () => {
    let wasClicked = false;
    render(
      createTabs({
        onSelect: () => {
          wasClicked = true;
        },
      }),
    );

    assertTabSelected(1);

    userEvent.click(screen.getByTestId('tab1'));
    assertTabSelected(1);
    expect(wasClicked).toBe(true);
  });

  test('should switch tabs if setState is called within onSelect', () => {
    class Wrap extends React.Component {
      state = {};

      handleSelect = () => this.setState({ foo: 'bar' });

      render() {
        const { foo } = this.state;
        return createTabs({
          onSelect: this.handleSelect,
          className: foo,
        });
      }
    }

    render(<Wrap />);

    userEvent.click(screen.getByTestId('tab2'));
    assertTabSelected(2);

    userEvent.click(screen.getByTestId('tab3'));
    assertTabSelected(3);
  });

  test('should allow for higher order components', () => {
    expectToMatchSnapshot(
      <Tabs>
        <TabListWrapper>
          <TabWrapper>Foo</TabWrapper>
          <TabWrapper>Bar</TabWrapper>
        </TabListWrapper>
        <TabPanelWrapper>Foo</TabPanelWrapper>
        <TabPanelWrapper>Bar</TabPanelWrapper>
      </Tabs>,
    );
  });

  test('should allow string children', () => {
    expectToMatchSnapshot(
      <Tabs>
        Foo
        <TabList>
          Foo
          <Tab>Foo</Tab>
          Foo
          <Tab>Bar</Tab>
          Foo
        </TabList>
        <TabPanel>Bar</TabPanel>
        <TabPanel>Foo</TabPanel>
        Foo
      </Tabs>,
    );
  });

  test('should change tabs when arrow up/down is pressed', () => {
    render(createTabs());
    const firstTab = screen.getByTestId('tab1');
    const secondTab = screen.getByTestId('tab2');

    userEvent.tab();
    expect(firstTab).toHaveFocus();
    assertTabSelected(1);

    userEvent.type(firstTab, '{arrowdown}');
    expect(secondTab).toHaveFocus();
    assertTabSelected(2);

    userEvent.type(secondTab, '{arrowup}');
    expect(firstTab).toHaveFocus();
    assertTabSelected(1);
  });

  test('should not change tabs when arrow up/down is pressed and disableUpDownKeys is passed', () => {
    render(
      createTabs({
        disableUpDownKeys: true,
      }),
    );
    const firstTab = screen.getByTestId('tab1');

    userEvent.tab();
    expect(firstTab).toHaveFocus();
    assertTabSelected(1);

    userEvent.type(firstTab, '{arrowdown}');
    expect(firstTab).toHaveFocus();
    assertTabSelected(1);

    userEvent.type(firstTab, '{arrowup}');
    expect(firstTab).toHaveFocus();
    assertTabSelected(1);
  });

  test('should render first tab once tabs are available', () => {
    const { rerender } = render(<Tabs></Tabs>);

    rerender(
      <Tabs>
        <TabList>
          <Tab data-testid="tab1">Tab1</Tab>
          <Tab data-testid="tab2">Tab2</Tab>
        </TabList>
        <TabPanel data-testid="panel1">Hello Tab1</TabPanel>
        <TabPanel data-testid="panel2">Hello Tab2</TabPanel>
      </Tabs>,
    );

    assertTabSelected(1);
  });
});
