import { afterEach, beforeAll, describe, expect, test } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import TabPanel from '../TabPanel';
import { TabsContext } from '../TabsContext';
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
    expectToMatchSnapshot(<TabPanel itemKey={0}>Hola</TabPanel>);
  });

  test('should render when selected', () => {
    expectToMatchSnapshot(
      <TabsContext.Provider value={{ id: 'group', selectedKey: 0 }}>
        <TabPanel itemKey={0}>Hola</TabPanel>
      </TabsContext.Provider>,
    );
  });

  test('should render when forced', () => {
    expectToMatchSnapshot(
      <TabPanel itemKey={0} forceRender>
        Hola
      </TabPanel>,
    );
  });

  test('should accept className', () => {
    expectToMatchSnapshot(<TabPanel itemKey={0} className="foobar" />);
  });

  test('should support being selected', () => {
    expectToMatchSnapshot(
      <TabsContext.Provider value={{ id: 'group', selectedKey: 0 }}>
        <TabPanel itemKey={0}>Hola</TabPanel>
      </TabsContext.Provider>,
    );
  });

  test('should support being selected with custom class name', () => {
    expectToMatchSnapshot(
      <TabsContext.Provider value={{ id: 'group', selectedKey: 0 }}>
        <TabPanel itemKey={0} selectedClassName="selected">
          Hola
        </TabPanel>
      </TabsContext.Provider>,
    );
  });

  test('should pass through custom properties', () => {
    expectToMatchSnapshot(
      <TabPanel itemKey={0} data-tooltip="Tooltip contents" />,
    );
  });

  test('should not allow overriding all default properties', () => {
    // eslint-disable-next-line jsx-a11y-x/aria-role
    expectToMatchSnapshot(<TabPanel itemKey={0} role="micro-tab" />);
  });

  test('should allow for higher-order components', () => {
    expectToMatchSnapshot(<TabPanelWrapper itemKey={0} />);
  });
});
