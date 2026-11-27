/**
 * @vitest-environment node
 */
import { expect, test } from 'vitest';
import { renderToString } from 'react-dom/server';
import { Tab, TabList, TabPanel, Tabs } from '../../index';

test('server renders the selected panel without a DOM', () => {
  const html = renderToString(
    <Tabs defaultKey={1}>
      <TabList>
        <Tab itemKey={0}>Overview</Tab>
        <Tab itemKey={1}>Details</Tab>
      </TabList>
      <TabPanel itemKey={0}>Overview content</TabPanel>
      <TabPanel itemKey={1}>Details content</TabPanel>
    </Tabs>,
  );

  expect(html).toContain('Details content');
  expect(html).not.toContain('Overview content');
});
