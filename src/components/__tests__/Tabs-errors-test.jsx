import { afterEach, expect, test, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Tab, TabList, TabPanel, Tabs } from '../../index';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

test.each([
  [{}, 'requires either selectedKey or defaultKey'],
  [{ defaultKey: '' }, 'requires either selectedKey or defaultKey'],
  [
    { defaultKey: 1, selectedKey: 1 },
    'requires either selectedKey or defaultKey',
  ],
  [
    { defaultKey: 1, selectedIndex: 1 },
    'instead of selectedIndex or defaultIndex',
  ],
  [{ selectedKey: 1 }, 'requires onSelect'],
  [{ defaultKey: 1, onSelect: true }, 'onSelect must be a function'],
])('rejects invalid selection props %j', (props, message) => {
  expect(() => render(<Tabs {...props} />)).toThrow(message);
});

test('rejects switching between controlled and uncontrolled mode', () => {
  const { rerender } = render(<Tabs defaultKey={1} />);
  expect(() => rerender(<Tabs selectedKey={1} onSelect={() => {}} />)).toThrow(
    'cannot switch between controlled and uncontrolled mode',
  );
});

test.each([undefined, '', NaN, Infinity])(
  'rejects an invalid item key %s',
  (itemKey) => {
    expect(() => render(<Tab itemKey={itemKey} />)).toThrow(
      'require a nonempty string or finite numeric itemKey',
    );
    expect(() => render(<TabPanel itemKey={itemKey} />)).toThrow(
      'require a nonempty string or finite numeric itemKey',
    );
  },
);

test('diagnoses duplicate and unmatched pairs and skips them during activation', async () => {
  const report = vi.spyOn(console, 'error').mockImplementation(() => {});
  const onSelect = vi.fn();
  render(
    <Tabs defaultKey="valid" onSelect={onSelect}>
      <TabList>
        <div>Extra content</div>
        <Tab itemKey="duplicate">Duplicate A</Tab>
        <Tab itemKey="duplicate">Duplicate B</Tab>
        <Tab itemKey="missing">Unpaired</Tab>
        <Tab itemKey="multi-panel">Multiple panels</Tab>
        <Tab itemKey="valid">Valid tab</Tab>
      </TabList>
      <TabPanel itemKey="duplicate" />
      <TabPanel itemKey="orphan" />
      <TabPanel itemKey="multi-panel" />
      <TabPanel itemKey="multi-panel" />
      <TabPanel itemKey="valid" />
    </Tabs>,
  );

  expect(report.mock.calls).toEqual([
    ['Duplicate Tab key "duplicate".'],
    ['Tab key "missing" has no matching TabPanel.'],
    ['TabPanel key "orphan" has no matching Tab.'],
    ['Duplicate TabPanel key "multi-panel".'],
  ]);
  await userEvent.click(screen.getByRole('tab', { name: 'Duplicate A' }));
  await userEvent.click(screen.getByRole('tab', { name: 'Unpaired' }));
  await userEvent.click(screen.getByRole('tab', { name: 'Multiple panels' }));
  expect(onSelect).not.toHaveBeenCalled();
});

test('diagnoses tabs outside a TabList and multiple owned lists', () => {
  const report = vi.spyOn(console, 'error').mockImplementation(() => {});
  render(
    <Tabs defaultKey={1}>
      <TabList />
      <TabList />
      <Tab itemKey={1} />
      <TabPanel itemKey={1} />
    </Tabs>,
  );
  expect(report).toHaveBeenCalledWith(
    'Only one TabList is allowed in a Tabs group.',
  );
  expect(report).toHaveBeenCalledWith(
    'Every Tab must be inside its group’s TabList.',
  );
});

test('skips DOM entries whose keys cannot identify a tab', async () => {
  const onSelect = vi.fn();
  render(
    <Tabs defaultKey="first" onSelect={onSelect}>
      <TabList>
        <Tab itemKey="first">First</Tab>
        <li role="tab" data-rttab="{">
          Malformed JSON
        </li>
        <li role="tab" data-rttab="false">
          Boolean key
        </li>
        <Tab itemKey="second">Second</Tab>
      </TabList>
      <div data-rttabpanel="{" />
      <div data-rttabpanel="false" />
      <TabPanel itemKey="first">First panel</TabPanel>
      <TabPanel itemKey="second">Second panel</TabPanel>
    </Tabs>,
  );

  await userEvent.click(screen.getByRole('tab', { name: 'Malformed JSON' }));
  await userEvent.click(screen.getByRole('tab', { name: 'Boolean key' }));
  expect(onSelect).not.toHaveBeenCalled();

  await userEvent.tab();
  await userEvent.keyboard('[ArrowRight]');
  expect(onSelect).toHaveBeenCalledWith(
    'second',
    'first',
    expect.objectContaining({ type: 'keydown' }),
  );
  expect(screen.getByRole('tab', { selected: true })).toBe(
    screen.getByRole('tab', { name: 'Second' }),
  );
});
