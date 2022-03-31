import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tab from '../Tab';
import TabList from '../TabList';
import TabPanel from '../TabPanel';
import Tabs from '../Tabs';
import { reset as resetIdCounter } from '../../helpers/uuid';

describe('<Tabs />', () => {
  let consoleErrorMock;

  function assertPropTypeWarning(message, nth = 1) {
    expect(consoleErrorMock).toHaveBeenNthCalledWith(
      nth,
      expect.anything(),
      expect.anything(),
      expect.stringMatching(message),
      expect.anything(),
    );
  }

  beforeEach(() => {
    resetIdCounter();
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  describe('errors', () => {
    test('should result with warning when tabs/panels are imbalanced and it should ignore non tab children', () => {
      render(
        <Tabs>
          <TabList>
            <Tab>Foo</Tab>
            <div>+</div>
          </TabList>

          <TabPanel>Hello Foo</TabPanel>
          <TabPanel>Hello Bar</TabPanel>
        </Tabs>,
      );

      assertPropTypeWarning(
        "There should be an equal number of 'Tab' and 'TabPanel' in `Tabs`. Received 1 'Tab' and 2 'TabPanel'.",
        1,
      );
      assertPropTypeWarning(
        "There should be an equal number of 'Tab' and 'TabPanel' in `UncontrolledTabs`. Received 1 'Tab' and 2 'TabPanel'.",
        2,
      );
    });

    test('should result with warning when multiple tablist components exist', () => {
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
      );

      assertPropTypeWarning(
        "Found multiple 'TabList' components inside 'Tabs'. Only one is allowed.",
      );
    });

    test('should result with warning when tab outside of tablist', () => {
      render(
        <Tabs>
          <TabList>
            <Tab>Foo</Tab>
          </TabList>
          <Tab>Foo</Tab>
          <TabPanel />
          <TabPanel />
        </Tabs>,
      );

      assertPropTypeWarning(
        "Found a 'Tab' component outside of the 'TabList' component. 'Tab' components have to be inside the 'TabList' component.",
      );
    });

    test('should result with warning when defaultIndex and selectedIndex set', () => {
      render(
        <Tabs selectedIndex={1} defaultIndex={1} onSelect={() => {}}>
          <TabList>
            <Tab>Foo</Tab>
          </TabList>
          <TabPanel>Foo</TabPanel>
        </Tabs>,
      );

      assertPropTypeWarning(
        'The prop `selectedIndex` cannot be used together with `defaultIndex` in `Tabs`.\nEither remove `selectedIndex` to let `Tabs` handle the selected tab internally or remove `defaultIndex` to handle it yourself.',
      );
    });

    test('should throw when mode of component changes', () => {
      const onSelect = () => {};
      const { rerender } = render(
        <Tabs defaultIndex={1} onSelect={onSelect}>
          <TabList>
            <Tab>Foo</Tab>
            <Tab>Foo2</Tab>
          </TabList>
          <TabPanel>Foo</TabPanel>
          <TabPanel>Foo2</TabPanel>
        </Tabs>,
      );

      const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();
      try {
        rerender(
          <Tabs selectedIndex={0} onSelect={onSelect}>
            <TabList>
              <Tab>Foo</Tab>
              <Tab>Foo2</Tab>
            </TabList>
            <TabPanel>Foo</TabPanel>
            <TabPanel>Foo2</TabPanel>
          </Tabs>,
        );
      } catch (e) {
        expect(e.message).toContain(
          'Switching between controlled mode (by using `selectedIndex`) and uncontrolled mode is not supported in `Tabs`.',
        );
      } finally {
        consoleLogMock.mockRestore();
      }
    });

    test('should result with warning when tabs/panels are imbalanced', () => {
      render(
        <Tabs>
          <TabList>
            <Tab>Foo</Tab>
          </TabList>
        </Tabs>,
      );

      assertPropTypeWarning(
        "There should be an equal number of 'Tab' and 'TabPanel' in `Tabs`. Received 1 'Tab' and 0 'TabPanel'.",
        1,
      );
      assertPropTypeWarning(
        "There should be an equal number of 'Tab' and 'TabPanel' in `UncontrolledTabs`. Received 1 'Tab' and 0 'TabPanel'.",
        2,
      );
    });

    test('should result with warning when onSelect missing when selectedIndex set', () => {
      render(
        <Tabs selectedIndex={1}>
          <TabList>
            <Tab>Foo</Tab>
          </TabList>
          <TabPanel>Foo</TabPanel>
        </Tabs>,
      );

      assertPropTypeWarning(
        'The prop `onSelect` is marked as required in `Tabs`, but its value is `undefined` or `null`.\n`onSelect` is required when `selectedIndex` is also set. Not doing so will make the tabs not do anything, as `selectedIndex` indicates that you want to handle the selected tab yourself.\nIf you only want to set the inital tab replace `selectedIndex` with `defaultIndex`.',
      );
    });
  });
});
