import { afterEach, beforeAll, describe, expect, test } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import Tab from '../Tab';
import { TabsContext } from '../TabsContext';
import { TabWrapper } from './helpers/higherOrder';

function expectToMatchSnapshot(component) {
  const { container } = render(component);
  expect(container.firstChild).toMatchSnapshot();
}

afterEach(cleanup);

const selectedTab = { id: 'group', selectedKey: 0 };

describe('<Tab />', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.error = (error) => {
      throw new Error(error);
    };
  });

  test('should have sane defaults', () => {
    expectToMatchSnapshot(<Tab itemKey={0} />);
  });

  test('should accept className', () => {
    expectToMatchSnapshot(<Tab itemKey={0} className="foobar" />);
  });

  test('should support being selected', () => {
    expectToMatchSnapshot(
      <TabsContext.Provider value={selectedTab}>
        <Tab itemKey={0}>Hello</Tab>
      </TabsContext.Provider>,
    );
  });

  test('should support being selected with custom class', () => {
    expectToMatchSnapshot(
      <TabsContext.Provider value={selectedTab}>
        <Tab itemKey={0} selectedClassName="cool" />
      </TabsContext.Provider>,
    );
  });

  test('should support being disabled', () => {
    expectToMatchSnapshot(<Tab itemKey={0} disabled />);
  });

  test('should support being disabled with custom class name', () => {
    expectToMatchSnapshot(
      <Tab itemKey={0} disabled disabledClassName="coolDisabled" />,
    );
  });

  test('should pass through custom properties', () => {
    expectToMatchSnapshot(<Tab itemKey={0} data-tooltip="Tooltip contents" />);
  });

  test('should not allow overriding all default properties', () => {
    // eslint-disable-next-line jsx-a11y-x/aria-role
    expectToMatchSnapshot(<Tab itemKey={0} role="micro-tab" />);
  });

  test('should allow to be wrapped in higher-order-component', () => {
    expectToMatchSnapshot(<TabWrapper itemKey={0} />);
  });

  test('override the tabIndex if it was provided', () => {
    expectToMatchSnapshot(
      <Tab itemKey={0} tabIndex={0}>
        Hello
      </Tab>,
    );
  });

  test('should honor tabIndex -1 on a selected tab', () => {
    const { getByRole } = render(
      <TabsContext.Provider value={selectedTab}>
        <Tab itemKey={0} tabIndex={-1}>
          Hello
        </Tab>
      </TabsContext.Provider>,
    );

    expect(getByRole('tab').getAttribute('tabindex')).toBe('-1');
  });
});
