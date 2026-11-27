import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest';
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
    // eslint-disable-next-line jsx-a11y-x/aria-role
    expectToMatchSnapshot(<TabList role="micro-tab" />);
  });

  test('should retain the default classnames for active and disabled tab', () => {
    expectToMatchSnapshot(
      <Tabs defaultKey={0}>
        <TabList>
          <Tab itemKey={0}>Foo</Tab>
          <Tab itemKey={1} disabled>
            Bar
          </Tab>
        </TabList>
        <TabPanel itemKey={0}>Foo</TabPanel>
        <TabPanel itemKey={1}>Bar</TabPanel>
      </Tabs>,
    );
  });

  test('should display the custom classnames for selected and disabled tab specified on tabs', () => {
    expectToMatchSnapshot(
      <Tabs
        defaultKey={0}
        selectedTabClassName="active"
        disabledTabClassName="disabled"
      >
        <TabList>
          <Tab itemKey={0}>Foo</Tab>
          <Tab itemKey={1} disabled>
            Bar
          </Tab>
        </TabList>
        <TabPanel itemKey={0}>Foo</TabPanel>
        <TabPanel itemKey={1}>Bar</TabPanel>
      </Tabs>,
    );
  });

  test('should display the custom classnames for selected and disabled tab', () => {
    expectToMatchSnapshot(
      <Tabs defaultKey={0}>
        <TabList>
          <Tab
            itemKey={0}
            selectedClassName="active"
            disabledClassName="disabled"
          >
            Foo
          </Tab>
          <Tab
            itemKey={1}
            disabled
            selectedClassName="active"
            disabledClassName="disabled"
          >
            Bar
          </Tab>
        </TabList>
        <TabPanel itemKey={0}>Foo</TabPanel>
        <TabPanel itemKey={1}>Bar</TabPanel>
      </Tabs>,
    );
  });

  test('should allow for higher order components', () => {
    expectToMatchSnapshot(
      <Tabs defaultKey={0}>
        <TabListWrapper>
          <TabWrapper itemKey={0}>Foo</TabWrapper>
          <TabWrapper itemKey={1}>Bar</TabWrapper>
        </TabListWrapper>
        <TabPanel itemKey={0}>Foo</TabPanel>
        <TabPanel itemKey={1}>Bar</TabPanel>
      </Tabs>,
    );
  });
});
