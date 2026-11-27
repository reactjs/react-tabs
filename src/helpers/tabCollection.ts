import { isTabKey } from '../components/TabsContext';
import type { TabKey } from '../types';

export interface TabEntry {
  key: TabKey;
  node: HTMLLIElement;
  disabled: boolean;
}

function readKey(token: string) {
  try {
    const key: unknown = JSON.parse(token);
    return isTabKey(key) ? key : undefined;
  } catch {
    return undefined;
  }
}

export function getTabCollection(root: HTMLDivElement) {
  const owns = (node: Element) => node.closest('[data-rttabs]') === root;
  const lists = Array.from(root.querySelectorAll('[data-rttablist]')).filter(
    owns,
  );
  const tabs = Array.from(
    root.querySelectorAll<HTMLLIElement>('li[data-rttab]'),
  ).filter(owns);
  const panels = Array.from(root.querySelectorAll('[data-rttabpanel]')).filter(
    owns,
  );
  const problems = new Set<string>();

  if (lists.length > 1) {
    problems.add('Only one TabList is allowed in a Tabs group.');
  }

  if (
    tabs.some(
      (tab) => !lists.some((list) => list === tab.closest('[data-rttablist]')),
    )
  ) {
    problems.add('Every Tab must be inside its group’s TabList.');
  }

  function groupByToken<T extends Element>(nodes: T[], attribute: string) {
    const groups = new Map<string, T[]>();
    for (const node of nodes) {
      const token = node.getAttribute(attribute);
      if (token === null) continue;
      const group = groups.get(token);
      if (group) group.push(node);
      else groups.set(token, [node]);
    }
    return groups;
  }

  const tabsByToken = groupByToken(tabs, 'data-rttab');
  const panelsByToken = groupByToken(panels, 'data-rttabpanel');
  const entries: TabEntry[] = [];

  for (const [token, nodes] of tabsByToken) {
    const partners = panelsByToken.get(token);
    if (nodes.length > 1) problems.add(`Duplicate Tab key ${token}.`);
    if (!partners) problems.add(`Tab key ${token} has no matching TabPanel.`);
    if (nodes.length !== 1 || partners?.length !== 1 || lists.length !== 1)
      continue;

    const node = nodes[0];
    const key = readKey(token);
    if (key === undefined || node.closest('[data-rttablist]') !== lists[0])
      continue;

    entries.push({
      key,
      node,
      disabled: node.getAttribute('aria-disabled') === 'true',
    });
  }

  for (const [token, nodes] of panelsByToken) {
    if (nodes.length > 1) problems.add(`Duplicate TabPanel key ${token}.`);
    if (!tabsByToken.has(token))
      problems.add(`TabPanel key ${token} has no matching Tab.`);
  }

  return { entries, problems };
}

export function findTabTarget(entries: TabEntry[], target: EventTarget) {
  const node = target as Node;
  const element = node.nodeType === 1 ? (node as Element) : node.parentElement;
  const tab = element?.closest('[data-rttab]');
  return entries.find((entry) => entry.node === tab);
}
