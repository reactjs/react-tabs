/**
 * @jest-environment node
 */
import React from 'react';
import Tab from '../Tab';
import TabList from '../TabList';
import TabPanel from '../TabPanel';
import Tabs from '../Tabs';

jest.mock('react', () => {
  const originalModule = jest.requireActual('react');

  return {
    ...originalModule,
    useId: () => ':r0:',
  };
});

function createTabs(props = {}) {
  return (
    <Tabs {...props}>
      <TabList>
        <Tab>Foo</Tab>
        <Tab>Bar</Tab>
        <Tab>
          <a href="a">Baz</a>
        </Tab>
        <Tab disabled>Qux</Tab>
      </TabList>
      <TabPanel>Hello Foo</TabPanel>
      <TabPanel>Hello Bar</TabPanel>
      <TabPanel>Hello Baz</TabPanel>
      <TabPanel>Hello Qux</TabPanel>
    </Tabs>
  );
}

describe('ServerSide <Tabs />', () => {
  test('does not crash in node environments', () => {
    expect(() => createTabs()).not.toThrow();
  });
});
