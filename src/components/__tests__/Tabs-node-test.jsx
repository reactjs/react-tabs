/**
 * @vitest-environment node
 */
import { expect, test } from 'vitest';
import { renderToString } from 'react-dom/server';
import { Tab, TabList, TabPanel, Tabs } from '../../index';

test('server renders the selected panel without a DOM', () => {
  const html = renderToString(
    <Tabs defaultIndex={1}>
      <TabList>
        <Tab>Overview</Tab>
        <Tab>Details</Tab>
      </TabList>
      <TabPanel>Overview content</TabPanel>
      <TabPanel>Details content</TabPanel>
    </Tabs>,
  );

  expect(html).toContain('Details content');
  expect(html).not.toContain('Overview content');
});
