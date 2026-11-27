import { afterEach, describe, expect, test, vi } from 'vitest';
import React from 'react';
import { cleanup, render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import Tab from '../Tab';
import TabList from '../TabList';
import TabPanel from '../TabPanel';
import Tabs from '../Tabs';
import {
  TabListWrapper,
  TabWrapper,
  TabPanelWrapper,
} from './helpers/higherOrder';

vi.mock('react', async (importOriginal) => {
  const originalModule = await importOriginal('react');

  return {
    ...originalModule,
    useId: () => ':r0:',
  };
});

function expectToMatchSnapshot(component) {
  expect(render(component).container.firstChild).toMatchSnapshot();
}

function createTabs(props = {}) {
  return (
    <Tabs
      {...(props.selectedKey === undefined ? { defaultKey: 0 } : {})}
      {...props}
    >
      <TabList>
        <Tab itemKey={0} data-testid="tab1">
          Tab1
        </Tab>
        <Tab itemKey={1} data-testid="tab2">
          Tab2
        </Tab>
        <Tab itemKey={2} data-testid="tab3">
          <a href="a">Tab3</a>
        </Tab>
        <Tab itemKey={3} data-testid="tab4" disabled>
          Tab4
        </Tab>
      </TabList>
      <TabPanel itemKey={0} data-testid="panel1">
        Hello Tab1
      </TabPanel>
      <TabPanel itemKey={1} data-testid="panel2">
        Hello Tab2
      </TabPanel>
      <TabPanel itemKey={2} data-testid="panel3">
        Hello Tab3
      </TabPanel>
      <TabPanel itemKey={3} data-testid="panel4">
        Hello Tab4
      </TabPanel>
    </Tabs>
  );
}

function assertTabSelected(tabNo, node = screen) {
  const tab = node.getByTestId(`tab${tabNo}`);
  const panel = node.getByTestId(`panel${tabNo}`);

  expect(tab).toHaveAttribute('aria-selected', 'true');
  expect(panel).toHaveTextContent(`Hello Tab${tabNo}`);
}

afterEach(cleanup);

describe('<Tabs />', () => {
  describe('props', () => {
    test('should have sane defaults', () => {
      expectToMatchSnapshot(createTabs());
    });

    test('should honor positive defaultKey prop', () => {
      expectToMatchSnapshot(createTabs({ defaultKey: 1 }));
    });

    test('should select the first enabled tab when the default key is missing', () => {
      render(createTabs({ defaultKey: -1 }));
      assertTabSelected(1);
    });

    test('should call onSelect with the React event when selection changes', async () => {
      const onSelect = vi.fn();
      render(createTabs({ onSelect }));

      await userEvent.click(screen.getByTestId('tab2'));

      expect(onSelect).toHaveBeenLastCalledWith(
        1,
        0,
        expect.objectContaining({
          type: 'click',
          nativeEvent: expect.objectContaining({ type: 'click' }),
        }),
      );

      await userEvent.keyboard('[ArrowRight]');

      expect(onSelect).toHaveBeenLastCalledWith(
        2,
        1,
        expect.objectContaining({
          key: 'ArrowRight',
          nativeEvent: expect.objectContaining({ type: 'keydown' }),
        }),
      );
    });

    test('should accept className', () => {
      expectToMatchSnapshot(createTabs({ className: 'foobar' }));
    });

    test('should call domRef with the root on mount and null on unmount', () => {
      const domRef = vi.fn();
      const { container, unmount } = render(createTabs({ domRef }));

      expect(domRef).toHaveBeenLastCalledWith(container.firstElementChild);

      unmount();

      expect(domRef).toHaveBeenLastCalledWith(null);
    });
  });

  describe('interaction', () => {
    describe('mouse', () => {
      test('should update selectedKey when clicked', async () => {
        render(createTabs());
        await userEvent.click(screen.getByTestId('tab2'));

        assertTabSelected(2);
      });

      test('should update selectedKey when tab child is clicked', async () => {
        render(createTabs());
        await userEvent.click(screen.getByTestId('tab3'));

        assertTabSelected(3);
      });

      test('should not change selectedKey when clicking a disabled tab', async () => {
        render(createTabs({ defaultKey: 0 }));
        await userEvent.click(screen.getByTestId('tab4'));

        assertTabSelected(1);
      });
    });

    describe('keyboard', () => {
      test('should change focus on tab and tabindex set', async () => {
        render(
          <Tabs defaultKey={0}>
            <TabList>
              <Tab itemKey={0} data-testid="tab1" tabIndex={0}>
                Tab1
              </Tab>
              <Tab itemKey={1} data-testid="tab2" tabIndex={0}>
                Tab2
              </Tab>
              <Tab itemKey={2} data-testid="tab3" tabIndex={0}>
                Tab3
              </Tab>
            </TabList>
            <TabPanel itemKey={0} data-testid="panel1">
              Hello Tab1
            </TabPanel>
            <TabPanel itemKey={1} data-testid="panel2">
              Hello Tab2
            </TabPanel>
            <TabPanel itemKey={2} data-testid="panel3">
              Hello Tab3
            </TabPanel>
          </Tabs>,
        );
        const element = screen.getByTestId('tab1');
        await userEvent.click(element);

        assertTabSelected(1);

        await userEvent.keyboard('[Tab]');
        await userEvent.keyboard('[Enter]');

        assertTabSelected(2);

        await userEvent.keyboard('[Tab]');
        await userEvent.keyboard('[Space]');

        assertTabSelected(3);
      });

      test('should update selectedKey when arrow right key pressed', async () => {
        render(createTabs());
        const element = screen.getByTestId('tab1');
        await userEvent.click(element);
        await userEvent.type(element, '[ArrowRight]');

        assertTabSelected(2);
      });

      test('should overflow when arrow right key pressed and no right tab available', async () => {
        render(createTabs());
        const element = screen.getByTestId('tab3');
        await userEvent.click(element);
        await userEvent.type(element, '[ArrowRight]');

        assertTabSelected(1);
      });

      test('should not do anything when arrow right key pressed and no other tab available', async () => {
        render(
          <Tabs defaultKey={0}>
            <TabList>
              <Tab itemKey={0} data-testid="tab1">
                Tab1
              </Tab>
              <Tab itemKey={1} data-testid="tab2" disabled>
                Tab2
              </Tab>
            </TabList>
            <TabPanel itemKey={0} data-testid="panel1">
              Hello Tab1
            </TabPanel>
            <TabPanel itemKey={1} data-testid="panel2">
              Hello Tab2
            </TabPanel>
          </Tabs>,
        );
        const element = screen.getByTestId('tab1');
        await userEvent.click(element);
        await userEvent.keyboard('[ArrowRight]');

        assertTabSelected(1);
      });

      test('should overflow when arrow left key pressed and no left tab available', async () => {
        render(createTabs());
        const element = screen.getByTestId('tab1');
        await userEvent.click(element);
        await userEvent.keyboard('[ArrowLeft]');

        assertTabSelected(3);
      });

      test('should not do anything when arrow left key pressed and no other tab available', async () => {
        render(
          <Tabs defaultKey={0}>
            <TabList>
              <Tab itemKey={0} data-testid="tab1" disabled>
                Tab1
              </Tab>
              <Tab itemKey={1} data-testid="tab2">
                Tab2
              </Tab>
            </TabList>
            <TabPanel itemKey={0} data-testid="panel1">
              Hello Tab1
            </TabPanel>
            <TabPanel itemKey={1} data-testid="panel2">
              Hello Tab2
            </TabPanel>
          </Tabs>,
        );
        const element = screen.getByTestId('tab2');
        await userEvent.click(element);
        await userEvent.keyboard('[ArrowLeft]');

        assertTabSelected(2);
      });

      test('should move to first tab on home key', async () => {
        render(createTabs());
        const element = screen.getByTestId('tab3');
        await userEvent.click(element);
        await userEvent.type(element, '[Home]');

        assertTabSelected(1);
      });

      test('should move to first tab on end key', async () => {
        render(createTabs());
        const element = screen.getByTestId('tab1');
        await userEvent.click(element);
        await userEvent.type(element, '[End]');

        assertTabSelected(3);
      });

      test.each(['Home', 'End'])(
        'should keep selection on %s when every tab is disabled',
        async (key) => {
          const onSelect = vi.fn();
          render(
            <Tabs defaultKey={0} defaultFocus onSelect={onSelect}>
              <TabList>
                <Tab itemKey={0} data-testid="tab1" disabled>
                  Tab1
                </Tab>
                <Tab itemKey={1} disabled>
                  Tab2
                </Tab>
              </TabList>
              <TabPanel itemKey={0} data-testid="panel1">
                Hello Tab1
              </TabPanel>
              <TabPanel itemKey={1}>Hello Tab2</TabPanel>
            </Tabs>,
          );

          expect(screen.getByTestId('tab1')).toHaveFocus();
          await userEvent.keyboard(`[${key}]`);

          expect(onSelect).not.toHaveBeenCalled();
          assertTabSelected(1);
        },
      );

      test('should update selectedKey when arrow left key pressed (RTL)', async () => {
        render(createTabs({ direction: 'rtl' }));
        const element = screen.getByTestId('tab1');
        await userEvent.click(element);
        await userEvent.type(element, '[ArrowLeft]');

        assertTabSelected(2);
      });

      test('should update selectedKey when arrow right key pressed (RTL)', async () => {
        render(createTabs({ direction: 'rtl' }));
        const element = screen.getByTestId('tab2');
        await userEvent.click(element);
        await userEvent.type(element, '[ArrowRight]');

        assertTabSelected(1);
      });

      test('should not change selectedKey when arrow left key pressed on a disabled tab', async () => {
        render(createTabs());
        const element = screen.getByTestId('tab4');
        await userEvent.click(element);
        await userEvent.type(element, '[ArrowLeft]');

        assertTabSelected(1);
      });
    });
  });

  describe('performance', () => {
    test('should only render the selected tab panel', async () => {
      render(createTabs());
      const tabPanels = screen.getAllByRole('tabpanel', { hidden: true });

      expect(tabPanels[0]).toHaveTextContent('Hello Tab1');
      expect(tabPanels[1]).toHaveTextContent('');
      expect(tabPanels[2]).toHaveTextContent('');
      expect(tabPanels[3]).toHaveTextContent('');

      await userEvent.click(screen.getByTestId('tab2'));

      expect(tabPanels[0]).toHaveTextContent('');
      expect(tabPanels[1]).toHaveTextContent('Hello Tab2');
      expect(tabPanels[2]).toHaveTextContent('');
      expect(tabPanels[3]).toHaveTextContent('');

      await userEvent.click(screen.getByTestId('tab3'));

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
    test('should allow random order for elements', () => {
      expectToMatchSnapshot(
        <Tabs defaultKey={0} forceRenderTabPanel>
          <TabPanel itemKey={0}>Hello Foo</TabPanel>
          <TabList>
            <Tab itemKey={0}>Foo</Tab>
            <Tab itemKey={1}>Bar</Tab>
          </TabList>
          <TabPanel itemKey={1}>Hello Bar</TabPanel>
        </Tabs>,
      );
    });

    test('should not throw a warning when wrong element is found', () => {
      expectToMatchSnapshot(
        <Tabs defaultKey={0}>
          <TabList>
            <Tab itemKey={0} />
            <div />
          </TabList>
          <TabPanel itemKey={0} />
        </Tabs>,
      );
    });

    test('should be okay with rendering without any children', () => {
      expectToMatchSnapshot(<Tabs defaultKey={0} />);
    });

    test('should be okay with rendering just TabList', () => {
      expectToMatchSnapshot(
        <Tabs defaultKey={0}>
          <TabList />
        </Tabs>,
      );
    });

    test('should gracefully render null', () => {
      expectToMatchSnapshot(
        <Tabs defaultKey={0}>
          <TabList>
            <Tab itemKey={0}>Tab A</Tab>
            {/* eslint-disable-next-line no-constant-binary-expression*/}
            {false && <Tab itemKey={1}>Tab B</Tab>}
          </TabList>
          <TabPanel itemKey={0}>Content A</TabPanel>
          {/* eslint-disable-next-line no-constant-binary-expression*/}
          {false && <TabPanel itemKey={1}>Content B</TabPanel>}
        </Tabs>,
      );
    });

    test('should support nested tabs', async () => {
      render(
        <Tabs defaultKey={0} data-testid="first">
          <TabList>
            <Tab itemKey={0} data-testid="tab1" />
            <Tab itemKey={1} />
          </TabList>
          <TabPanel itemKey={0} data-testid="panel1">
            Hello Tab1
            <Tabs defaultKey={0} data-testid="second">
              <TabList>
                <Tab itemKey={0} />
                <Tab itemKey={1} data-testid="tab2" />
              </TabList>
              <TabPanel itemKey={0} />
              <TabPanel itemKey={1} data-testid="panel2">
                Hello Tab2
              </TabPanel>
            </Tabs>
          </TabPanel>
          <TabPanel itemKey={1} />
        </Tabs>,
      );

      await userEvent.click(
        within(screen.getByTestId('second')).getByTestId('tab2'),
      );

      assertTabSelected(1);
      assertTabSelected(2, within(screen.getByTestId('second')));
    });

    test('should preserve the selected key and pairing when tabs reorder independently', async () => {
      function renderTabs(labels) {
        return (
          <Tabs defaultKey="Overview">
            <TabList>
              {labels.map((label) => (
                <Tab itemKey={label} key={label}>
                  {label}
                </Tab>
              ))}
            </TabList>
            <TabPanel itemKey="Overview">Overview content</TabPanel>
            <TabPanel itemKey="Details">Details content</TabPanel>
          </Tabs>
        );
      }

      const { rerender } = render(renderTabs(['Overview', 'Details']));
      const details = screen.getByRole('tab', { name: 'Details' });
      await userEvent.click(details);
      const detailsId = details.id;

      rerender(renderTabs(['Details', 'Overview']));

      const panel = screen.getByRole('tabpanel', { name: 'Details' });
      expect(screen.getByRole('tab', { name: 'Details' })).toBe(details);
      expect(details).toHaveAttribute('id', detailsId);
      expect(details).toHaveAttribute('aria-selected', 'true');
      expect(details).toHaveAttribute('aria-controls', panel.id);
      expect(panel).toHaveTextContent('Details content');
    });

    test('should give wrapped tabs and panels their state without forwarding hidden props', async () => {
      function WrappedTab({ children, itemKey }) {
        return (
          <Tab itemKey={itemKey} selectedClassName="local-tab">
            {children}
          </Tab>
        );
      }

      function WrappedPanel({ children, itemKey }) {
        return (
          <TabPanel itemKey={itemKey} selectedClassName="local-panel">
            {children}
          </TabPanel>
        );
      }

      render(
        <Tabs
          defaultKey={0}
          selectedTabClassName="active-tab"
          selectedTabPanelClassName="active-panel"
          forceRenderTabPanel
        >
          <TabList>
            <WrappedTab itemKey={0}>Overview</WrappedTab>
            <WrappedTab itemKey={1}>Details</WrappedTab>
          </TabList>
          <WrappedPanel itemKey={0}>Overview content</WrappedPanel>
          <WrappedPanel itemKey={1}>Details content</WrappedPanel>
        </Tabs>,
      );

      const details = screen.getByRole('tab', { name: 'Details' });
      const panel = screen.getByText('Details content');
      expect(panel).not.toBeVisible();
      expect(panel).not.toHaveClass('active-panel');

      await userEvent.click(details);

      expect(details).toHaveFocus();
      expect(details).toHaveClass('active-tab');
      expect(details).toHaveAttribute('aria-controls', panel.id);
      expect(panel).toBeVisible();
      expect(panel).toHaveClass('active-panel');
      expect(panel).not.toHaveClass('local-panel');
    });

    test('should allow other DOM nodes', () => {
      expectToMatchSnapshot(
        <Tabs defaultKey={0}>
          <div id="tabs-nav-wrapper">
            <button type="button">Left</button>
            <div className="tabs-container">
              <TabList>
                <Tab itemKey={0} />
                <Tab itemKey={1} />
              </TabList>
            </div>
            <button type="button">Right</button>
          </div>
          <div className="tab-panels">
            <TabPanel itemKey={0} />
            <TabPanel itemKey={1} />
          </div>
        </Tabs>,
      );
    });
  });

  test('should pass through custom properties', () => {
    expectToMatchSnapshot(
      <Tabs defaultKey={0} data-tooltip="Tooltip contents" />,
    );
  });

  test('should not add known props to dom', () => {
    expectToMatchSnapshot(<Tabs defaultKey={3} />);
  });

  test('should cancel if event handler returns false', async () => {
    render(createTabs({ onSelect: () => false }));

    assertTabSelected(1);

    await userEvent.click(screen.getByTestId('tab2'));
    assertTabSelected(1);

    await userEvent.click(screen.getByTestId('tab3'));
    assertTabSelected(1);
  });

  test('should trigger onSelect handler when clicking', async () => {
    let wasClicked = false;
    render(
      createTabs({
        onSelect: () => {
          wasClicked = true;
        },
      }),
    );

    assertTabSelected(1);

    await userEvent.click(screen.getByTestId('tab2'));
    assertTabSelected(2);
    expect(wasClicked).toBe(true);
  });

  test('should trigger onSelect handler when clicking on open tab', async () => {
    let wasClicked = false;
    render(
      createTabs({
        onSelect: () => {
          wasClicked = true;
        },
      }),
    );

    assertTabSelected(1);

    await userEvent.click(screen.getByTestId('tab1'));
    assertTabSelected(1);
    expect(wasClicked).toBe(true);
  });

  test('should switch tabs if setState is called within onSelect', async () => {
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

    await userEvent.click(screen.getByTestId('tab2'));
    assertTabSelected(2);

    await userEvent.click(screen.getByTestId('tab3'));
    assertTabSelected(3);
  });

  test('should allow for higher order components', () => {
    expectToMatchSnapshot(
      <Tabs defaultKey={0}>
        <TabListWrapper>
          <TabWrapper itemKey={0}>Foo</TabWrapper>
          <TabWrapper itemKey={1}>Bar</TabWrapper>
        </TabListWrapper>
        <TabPanelWrapper itemKey={0}>Foo</TabPanelWrapper>
        <TabPanelWrapper itemKey={1}>Bar</TabPanelWrapper>
      </Tabs>,
    );
  });

  test('should allow string children', () => {
    expectToMatchSnapshot(
      <Tabs defaultKey={0}>
        Foo
        <TabList>
          Foo
          <Tab itemKey={0}>Foo</Tab>
          Foo
          <Tab itemKey={1}>Bar</Tab>
          Foo
        </TabList>
        <TabPanel itemKey={0}>Bar</TabPanel>
        <TabPanel itemKey={1}>Foo</TabPanel>
        Foo
      </Tabs>,
    );
  });

  test('should focus the initially selected uncontrolled tab', () => {
    render(createTabs({ defaultFocus: true, defaultKey: 1 }));

    expect(screen.getByTestId('tab2')).toHaveFocus();
  });

  test('should focus the initially selected controlled tab only on mount', () => {
    const onSelect = vi.fn();
    const renderTabs = (selectedKey, defaultFocus) => (
      <>
        <input aria-label="Outside" />
        {createTabs({ defaultFocus, selectedKey, onSelect })}
      </>
    );
    const { rerender } = render(renderTabs(1, true));
    expect(screen.getByTestId('tab2')).toHaveFocus();

    const outside = screen.getByRole('textbox', { name: 'Outside' });
    outside.focus();
    rerender(renderTabs(0, true));
    assertTabSelected(1);
    expect(outside).toHaveFocus();

    rerender(renderTabs(0, false));
    rerender(renderTabs(0, true));
    expect(outside).toHaveFocus();
  });

  test('should change tabs when arrow up/down is pressed', async () => {
    render(createTabs());
    const firstTab = screen.getByTestId('tab1');
    const secondTab = screen.getByTestId('tab2');

    await userEvent.tab();
    expect(firstTab).toHaveFocus();
    assertTabSelected(1);

    await userEvent.type(firstTab, '[ArrowDown]');
    expect(secondTab).toHaveFocus();
    assertTabSelected(2);

    await userEvent.type(secondTab, '[ArrowUp]');
    expect(firstTab).toHaveFocus();
    assertTabSelected(1);
  });

  test('should not focus tabs if focusTabOnClick is false', async () => {
    render(createTabs({ focusTabOnClick: false }));
    const firstTab = screen.getByTestId('tab1');
    const secondTab = screen.getByTestId('tab2');

    expect(firstTab).not.toHaveFocus();
    expect(secondTab).not.toHaveFocus();
    assertTabSelected(1);

    await userEvent.click(secondTab);
    expect(firstTab).not.toHaveFocus();
    expect(secondTab).not.toHaveFocus();
    assertTabSelected(2);
  });

  test('should not focus tab again on rerender', async () => {
    const { rerender } = render(
      <>
        <input data-testid="input1" />
        {createTabs()}
      </>,
    );
    const firstTab = screen.getByTestId('tab1');
    const inputField = screen.getByTestId('input1');

    expect(firstTab).not.toHaveFocus();
    expect(inputField).not.toHaveFocus();

    await userEvent.click(firstTab);

    expect(firstTab).toHaveFocus();
    expect(inputField).not.toHaveFocus();

    await userEvent.click(inputField);

    expect(firstTab).not.toHaveFocus();
    expect(inputField).toHaveFocus();

    rerender(
      <>
        <input data-testid="input1" />
        {createTabs()}
      </>,
    );

    expect(firstTab).not.toHaveFocus();
    expect(inputField).toHaveFocus();
  });

  test('should retain tab focus when controlled tabs are inside a fragment', () => {
    const renderTabs = (selectedKey) => (
      <Tabs selectedKey={selectedKey} onSelect={() => {}}>
        <TabList>
          <>
            <Tab itemKey={0}>First</Tab>
            <Tab itemKey={1}>Second</Tab>
          </>
        </TabList>
        <TabPanel itemKey={0}>First panel</TabPanel>
        <TabPanel itemKey={1}>Second panel</TabPanel>
      </Tabs>
    );
    const { rerender } = render(renderTabs(0));
    screen.getByRole('tab', { name: 'First' }).focus();

    rerender(renderTabs(1));

    expect(screen.getByRole('tab', { name: 'Second' })).toHaveFocus();
  });

  test('should preserve outside focus when controlled tabs are inside a fragment', () => {
    const renderTabs = (selectedKey) => (
      <>
        <input aria-label="Outside" />
        <Tabs selectedKey={selectedKey} onSelect={() => {}}>
          <TabList>
            <>
              <Tab itemKey={0}>First</Tab>
              <Tab itemKey={1}>Second</Tab>
            </>
          </TabList>
          <TabPanel itemKey={0}>First panel</TabPanel>
          <TabPanel itemKey={1}>Second panel</TabPanel>
        </Tabs>
      </>
    );
    const { rerender } = render(renderTabs(0));
    const input = screen.getByRole('textbox', { name: 'Outside' });
    input.focus();

    rerender(renderTabs(1));

    expect(input).toHaveFocus();
  });

  test('should not change tabs when arrow up/down is pressed and disableUpDownKeys is passed', async () => {
    render(
      createTabs({
        disableUpDownKeys: true,
      }),
    );
    const firstTab = screen.getByTestId('tab1');

    await userEvent.tab();
    expect(firstTab).toHaveFocus();
    assertTabSelected(1);

    await userEvent.type(firstTab, '[ArrowDown]');
    expect(firstTab).toHaveFocus();
    assertTabSelected(1);

    await userEvent.type(firstTab, '[ArrowUp]');
    expect(firstTab).toHaveFocus();
    assertTabSelected(1);
  });

  test('should not change tabs when arrow left/right is pressed and disableLeftRightKeys is passed', async () => {
    render(
      createTabs({
        disableLeftRightKeys: true,
      }),
    );
    const firstTab = screen.getByTestId('tab1');

    await userEvent.tab();
    expect(firstTab).toHaveFocus();
    assertTabSelected(1);

    await userEvent.type(firstTab, '[ArrowLeft]');
    expect(firstTab).toHaveFocus();
    assertTabSelected(1);

    await userEvent.type(firstTab, '[ArrowRight]');
    expect(firstTab).toHaveFocus();
    assertTabSelected(1);
  });

  test('should render first tab once tabs are available', () => {
    const { rerender } = render(<Tabs defaultKey={0}></Tabs>);

    rerender(
      <Tabs defaultKey={0}>
        <TabList>
          <Tab itemKey={0} data-testid="tab1">
            Tab1
          </Tab>
          <Tab itemKey={1} data-testid="tab2">
            Tab2
          </Tab>
        </TabList>
        <TabPanel itemKey={0} data-testid="panel1">
          Hello Tab1
        </TabPanel>
        <TabPanel itemKey={1} data-testid="panel2">
          Hello Tab2
        </TabPanel>
      </Tabs>,
    );

    assertTabSelected(1);
  });
});
