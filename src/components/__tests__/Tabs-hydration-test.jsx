/* global document */
import { afterEach, expect, test, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import { cleanup, render, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { Tab, TabList, TabPanel, Tabs } from '../../index';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

test('hydrates server markup and keeps tabs linked to their panels', async () => {
  const tabs = (
    <Tabs>
      <TabList>
        <Tab>Overview</Tab>
        <Tab>Details</Tab>
      </TabList>
      <TabPanel>Overview content</TabPanel>
      <TabPanel>Details content</TabPanel>
    </Tabs>
  );
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  const onRecoverableError = vi.fn();
  const container = document.body.appendChild(document.createElement('div'));
  container.innerHTML = renderToString(tabs);
  const { getByRole } = within(container);
  const serverTab = getByRole('tab', { name: 'Details' });
  const serverPanel = getByRole('tabpanel', { name: 'Details' });

  render(tabs, { container, hydrate: true, onRecoverableError });

  expect(getByRole('tab', { name: 'Details' })).toBe(serverTab);
  expect(serverTab).toHaveAttribute('aria-selected', 'false');
  await userEvent.click(serverTab);

  expect(serverTab).toHaveAttribute('aria-selected', 'true');
  expect(getByRole('tabpanel', { name: 'Details' })).toBe(serverPanel);
  expect(serverTab).toHaveAttribute('aria-controls', serverPanel.id);
  expect(serverPanel).toHaveTextContent('Details content');
  expect(onRecoverableError).not.toHaveBeenCalled();
  expect(consoleError).not.toHaveBeenCalled();
});
