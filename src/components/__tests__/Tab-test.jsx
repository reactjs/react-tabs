import { afterEach, beforeAll, describe, expect, test } from 'vitest';
import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Tab from '../Tab';
import { TabWrapper } from './helpers/higherOrder';

function expectToMatchSnapshot(component) {
  const { container } = render(component);
  expect(container.firstChild).toMatchSnapshot();
}

afterEach(cleanup);

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
      <Tab selected id="abcd">
        Hello
      </Tab>,
    );
  });

  test('should support being selected with custom class', () => {
    expectToMatchSnapshot(<Tab selected selectedClassName="cool" />);
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
    // eslint-disable-next-line jsx-a11y/aria-role
    expectToMatchSnapshot(<Tab role="micro-tab" />);
  });

  test('should allow to be wrapped in higher-order-component', () => {
    expectToMatchSnapshot(<TabWrapper />);
  });

  test('override the tabIndex if it was provided', () => {
    expectToMatchSnapshot(<Tab tabIndex="0">Hello</Tab>);
  });
});
