import { StrictMode, useState } from 'react';
import { afterEach, expect, test, vi } from 'vitest';
import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { Tab, TabList, TabPanel, Tabs } from '../../index';

afterEach(cleanup);

function group(keys, props = { defaultKey: 'active' }) {
  return (
    <Tabs {...props}>
      <TabList>
        {keys.map((key) => (
          <Tab itemKey={key} key={key}>
            {key}
          </Tab>
        ))}
      </TabList>
      {keys.map((key) => (
        <TabPanel itemKey={key} key={key}>
          {key} content
        </TabPanel>
      ))}
    </Tabs>
  );
}

test('distinguishes numeric and string keys during selection and ARIA linking', async () => {
  const onSelect = vi.fn();
  render(
    <Tabs defaultKey={1} onSelect={onSelect}>
      <TabList>
        <Tab itemKey={1}>Numeric</Tab>
        <Tab itemKey="1">String</Tab>
      </TabList>
      <TabPanel itemKey="1">String panel</TabPanel>
      <TabPanel itemKey={1}>Numeric panel</TabPanel>
    </Tabs>,
  );

  const numeric = screen.getByRole('tab', { name: 'Numeric' });
  const string = screen.getByRole('tab', { name: 'String' });
  expect(numeric.id).not.toBe(string.id);
  expect(numeric).toHaveAttribute('aria-selected', 'true');

  await userEvent.click(string);

  expect(onSelect).toHaveBeenCalledWith(
    '1',
    1,
    expect.objectContaining({ type: 'click' }),
  );
  expect(string).toHaveAttribute(
    'aria-controls',
    screen.getByRole('tabpanel', { name: 'String' }).id,
  );
  expect(screen.getByText('String panel')).toBeVisible();
  expect(screen.queryByText('Numeric panel')).not.toBeInTheDocument();
});

test('preserves the selected item when another tab is inserted or removed before it', () => {
  const onSelect = vi.fn();
  const props = { defaultKey: 'active', onSelect };
  const { rerender } = render(group(['before', 'active', 'after'], props));
  const active = screen.getByRole('tab', { name: 'active', selected: true });
  const panel = screen.getByRole('tabpanel', { name: 'active' });

  rerender(group(['active', 'after'], props));
  rerender(group(['inserted', 'active', 'after'], props));

  expect(screen.getByRole('tab', { name: 'active', selected: true })).toBe(
    active,
  );
  expect(screen.getByRole('tabpanel', { name: 'active' })).toBe(panel);
  expect(onSelect).not.toHaveBeenCalled();
});

test('recovers from removal inside a wrapper and notifies once after the replacement is applied', async () => {
  function Items() {
    const [showActive, setShowActive] = useState(true);
    return (
      <>
        <button type="button" onClick={() => setShowActive(false)}>
          Remove active tab
        </button>
        <TabList>
          <Tab itemKey="disabled" disabled>
            Disabled
          </Tab>
          {showActive && <Tab itemKey="active">Active</Tab>}
          <Tab itemKey="replacement">Replacement</Tab>
        </TabList>
        <TabPanel itemKey="replacement">Replacement content</TabPanel>
        {showActive && <TabPanel itemKey="active">Active content</TabPanel>}
        <TabPanel itemKey="disabled" />
      </>
    );
  }
  const onSelect = vi.fn(() => {
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent(
      'Replacement',
    );
    return false;
  });
  render(
    <StrictMode>
      <Tabs defaultKey="active" onSelect={onSelect}>
        <Items />
      </Tabs>
    </StrictMode>,
  );

  await userEvent.click(
    screen.getByRole('button', { name: 'Remove active tab' }),
  );

  await waitFor(() =>
    expect(onSelect).toHaveBeenCalledWith('replacement', 'active', undefined),
  );
  expect(onSelect).toHaveBeenCalledTimes(1);
  expect(screen.getByText('Replacement content')).toBeVisible();
  expect(screen.getByRole('button')).toHaveFocus();
});

test('waits for an enabled replacement after removal leaves only disabled tabs', async () => {
  const onSelect = vi.fn();
  function renderTabs(active, disabled) {
    return (
      <Tabs defaultKey="active" onSelect={onSelect}>
        <TabList>
          {active && <Tab itemKey="active">Active</Tab>}
          <Tab itemKey={0} disabled={disabled}>
            Replacement
          </Tab>
        </TabList>
        {active && <TabPanel itemKey="active">Active content</TabPanel>}
        <TabPanel itemKey={0}>Replacement content</TabPanel>
      </Tabs>
    );
  }
  const { rerender } = render(renderTabs(true, true));

  rerender(renderTabs(false, true));
  expect(screen.queryByRole('tab', { selected: true })).not.toBeInTheDocument();
  expect(onSelect).not.toHaveBeenCalled();

  rerender(renderTabs(false, false));
  await waitFor(() =>
    expect(onSelect).toHaveBeenCalledWith(0, 'active', undefined),
  );
  expect(onSelect).toHaveBeenCalledTimes(1);
});

test('keeps a controlled group unselected when its key disappears but leaves a keyboard entry point', async () => {
  const onSelect = vi.fn();
  const props = { selectedKey: 'active', onSelect };
  const { rerender } = render(group(['active', 'first', 'second'], props));
  rerender(group(['first', 'second'], props));

  expect(screen.queryByRole('tab', { selected: true })).not.toBeInTheDocument();
  expect(screen.queryByText('first content')).not.toBeInTheDocument();
  expect(onSelect).not.toHaveBeenCalled();

  await userEvent.tab();
  expect(screen.getByRole('tab', { name: 'first' })).toHaveFocus();
  await userEvent.keyboard('[ArrowRight]');

  expect(onSelect).toHaveBeenCalledWith(
    'second',
    'active',
    expect.objectContaining({ type: 'keydown' }),
  );
  expect(screen.queryByRole('tab', { selected: true })).not.toBeInTheDocument();

  rerender(group(['first', 'second'], { ...props, selectedKey: 'second' }));
  expect(
    screen.getByRole('tab', { name: 'second', selected: true }),
  ).toHaveFocus();
});

test('scopes identical keys and ARIA IDs to their nearest group', () => {
  render(
    <Tabs defaultKey="shared">
      <TabList>
        <Tab itemKey="shared">Outer</Tab>
      </TabList>
      <TabPanel itemKey="shared">
        <section aria-label="Inner group">
          <Tabs defaultKey="shared">
            <TabList>
              <Tab itemKey="shared">Inner</Tab>
            </TabList>
            <TabPanel itemKey="shared">Inner content</TabPanel>
          </Tabs>
        </section>
      </TabPanel>
    </Tabs>,
  );

  const inner = within(screen.getByRole('region', { name: 'Inner group' }));
  const outerTab = screen.getByRole('tab', { name: 'Outer' });
  const innerTab = inner.getByRole('tab', { name: 'Inner' });
  expect(outerTab.id).not.toBe(innerTab.id);
  expect(innerTab).toHaveAttribute(
    'aria-controls',
    inner.getByRole('tabpanel').id,
  );
});

test('updates controlled selection when the supplied environment blocks focus inspection', () => {
  const readActiveElement = vi.fn(() => {
    throw new Error('Frame is no longer accessible');
  });
  const environment = {
    document: Object.defineProperty({}, 'activeElement', {
      get: readActiveElement,
    }),
  };
  const props = { selectedKey: 'first', environment, onSelect: vi.fn() };
  const { rerender } = render(group(['first', 'second'], props));
  const first = screen.getByRole('tab', { name: 'first' });
  first.focus();
  readActiveElement.mockClear();

  rerender(group(['first', 'second'], { ...props, selectedKey: 'second' }));

  expect(readActiveElement).toHaveBeenCalledOnce();
  expect(
    screen.getByRole('tab', { name: 'second', selected: true }),
  ).toBeVisible();
  expect(first).toHaveFocus();
});
