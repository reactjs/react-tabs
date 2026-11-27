import { afterEach, beforeAll, describe, expect, test } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import Tab from '../Tab';
import { TabsItemContext } from '../TabsItemContext';
import { TabWrapper } from './helpers/higherOrder';

function expectToMatchSnapshot(component) {
  const { container } = render(component);
  expect(container.firstChild).toMatchSnapshot();
}

afterEach(cleanup);

const selectedTab = {
  kind: 'tab',
  id: 'abcd',
  selected: true,
  focus: false,
  registerNode() {},
};

describe('<Tab />', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.error = (error) => {
      throw new Error(error);
    };
  });

  test('should have sane defaults', () => {
    expectToMatchSnapshot(<Tab />);
  });

  test('should accept className', () => {
    expectToMatchSnapshot(<Tab className="foobar" />);
  });

  test('should support being selected', () => {
    expectToMatchSnapshot(
      <TabsItemContext.Provider value={selectedTab}>
        <Tab>Hello</Tab>
      </TabsItemContext.Provider>,
    );
  });

  test('should support being selected with custom class', () => {
    expectToMatchSnapshot(
      <TabsItemContext.Provider value={selectedTab}>
        <Tab selectedClassName="cool" />
      </TabsItemContext.Provider>,
    );
  });

  test('should support being disabled', () => {
    expectToMatchSnapshot(<Tab disabled />);
  });

  test('should support being disabled with custom class name', () => {
    expectToMatchSnapshot(<Tab disabled disabledClassName="coolDisabled" />);
  });

  test('should pass through custom properties', () => {
    expectToMatchSnapshot(<Tab data-tooltip="Tooltip contents" />);
  });

  test('should not allow overriding all default properties', () => {
    // eslint-disable-next-line jsx-a11y-x/aria-role
    expectToMatchSnapshot(<Tab role="micro-tab" />);
  });

  test('should allow to be wrapped in higher-order-component', () => {
    expectToMatchSnapshot(<TabWrapper />);
  });

  test('override the tabIndex if it was provided', () => {
    expectToMatchSnapshot(<Tab tabIndex={0}>Hello</Tab>);
  });

  test('should honor tabIndex -1 on a selected tab', () => {
    const { getByRole } = render(
      <TabsItemContext.Provider value={selectedTab}>
        <Tab tabIndex={-1}>Hello</Tab>
      </TabsItemContext.Provider>,
    );

    expect(getByRole('tab').getAttribute('tabindex')).toBe('-1');
  });
});
