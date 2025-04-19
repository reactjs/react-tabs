import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest';
import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Tab from '../Tab';
import TabList from '../TabList';
import TabPanel from '../TabPanel';
import Tabs from '../Tabs';
import { TabListWrapper, TabWrapper } from './helpers/higherOrder';

vi.mock('react', async (importOriginal) => {
  const originalModule = await importOriginal();

  return {
    ...originalModule,
    useId: () => ':r0:',
  };
});

function expectToMatchSnapshot(component) {
  const { container } = render(component);
  expect(container.firstChild).toMatchSnapshot();
}

afterEach(cleanup);

describe('<TabList />', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.error = (error) => {
      throw new Error(error);
    };
  });

  test('should have sane defaults', () => {
    expectToMatchSnapshot(<TabList />);
  });

  test('should accept className', () => {
    expectToMatchSnapshot(<TabList className="foobar" />);
  });

  test('should pass through custom properties', () => {
    expectToMatchSnapshot(<TabList data-tooltip="Tooltip contents" />);
  });

  test('should not allow overriding all default properties', () => {
    // eslint-disable-next-line jsx-a11y/aria-role
    expectToMatchSnapshot(<TabList role="micro-tab" />);
  });

  test('should retain the default classnames for active and disabled tab', () => {
    expectToMatchSnapshot(
      <Tabs defaultIndex={0}>
        <TabList>
          <Tab>Foo</Tab>
          <Tab disabled>Bar</Tab>
        </TabList>
        <TabPanel>Foo</TabPanel>
        <TabPanel>Bar</TabPanel>
      </Tabs>,
    );
  });

  test('should display the custom classnames for selected and disabled tab specified on tabs', () => {
    expectToMatchSnapshot(
      <Tabs
        defaultIndex={0}
        selectedTabClassName="active"
        disabledTabClassName="disabled"
      >
        <TabList>
          <Tab>Foo</Tab>
          <Tab disabled>Bar</Tab>
        </TabList>
        <TabPanel>Foo</TabPanel>
        <TabPanel>Bar</TabPanel>
      </Tabs>,
    );
  });

  test('should display the custom classnames for selected and disabled tab', () => {
    expectToMatchSnapshot(
      <Tabs defaultIndex={0}>
        <TabList>
          <Tab selectedClassName="active" disabledClassName="disabled">
            Foo
          </Tab>
          <Tab disabled selectedClassName="active" disabledClassName="disabled">
            Bar
          </Tab>
        </TabList>
        <TabPanel>Foo</TabPanel>
        <TabPanel>Bar</TabPanel>
      </Tabs>,
    );
  });

  test('should allow for higher order components', () => {
    expectToMatchSnapshot(
      <Tabs>
        <TabListWrapper>
          <TabWrapper>Foo</TabWrapper>
          <TabWrapper>Bar</TabWrapper>
        </TabListWrapper>
        <TabPanel>Foo</TabPanel>
        <TabPanel>Bar</TabPanel>
      </Tabs>,
    );
  });
});
