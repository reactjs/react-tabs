import { afterEach, beforeAll, describe, expect, test } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import TabPanel from '../TabPanel';
import { TabsItemContext } from '../TabsItemContext';
import { TabPanelWrapper } from './helpers/higherOrder';

function expectToMatchSnapshot(component) {
  const { container } = render(component);
  expect(container.firstChild).toMatchSnapshot();
}

afterEach(cleanup);

describe('<TabPanel />', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.error = (error) => {
      throw new Error(error);
    };
  });

  test('should have sane defaults', () => {
    expectToMatchSnapshot(<TabPanel>Hola</TabPanel>);
  });

  test('should render when selected', () => {
    expectToMatchSnapshot(
      <TabsItemContext.Provider
        value={{ kind: 'panel', id: undefined, selected: true }}
      >
        <TabPanel>Hola</TabPanel>
      </TabsItemContext.Provider>,
    );
  });

  test('should render when forced', () => {
    expectToMatchSnapshot(<TabPanel forceRender>Hola</TabPanel>);
  });

  test('should accept className', () => {
    expectToMatchSnapshot(<TabPanel className="foobar" />);
  });

  test('should support being selected', () => {
    expectToMatchSnapshot(
      <TabsItemContext.Provider
        value={{ kind: 'panel', id: 'abcd', selected: true }}
      >
        <TabPanel>Hola</TabPanel>
      </TabsItemContext.Provider>,
    );
  });

  test('should support being selected with custom class name', () => {
    expectToMatchSnapshot(
      <TabsItemContext.Provider
        value={{ kind: 'panel', id: 'abcd', selected: true }}
      >
        <TabPanel selectedClassName="selected">Hola</TabPanel>
      </TabsItemContext.Provider>,
    );
  });

  test('should pass through custom properties', () => {
    expectToMatchSnapshot(<TabPanel data-tooltip="Tooltip contents" />);
  });

  test('should not allow overriding all default properties', () => {
    // eslint-disable-next-line jsx-a11y-x/aria-role
    expectToMatchSnapshot(<TabPanel role="micro-tab" />);
  });

  test('should allow for higher-order components', () => {
    expectToMatchSnapshot(<TabPanelWrapper />);
  });
});
