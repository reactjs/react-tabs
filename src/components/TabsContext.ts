import { createContext } from 'react';
import type { TabKey } from '../types';

export const TabsContext = createContext<{
  id: string;
  selectedKey: TabKey | undefined;
  fallbackKey: TabKey | undefined;
  disabledTabClassName?: string;
  selectedTabClassName?: string;
  selectedTabPanelClassName?: string;
  forceRenderTabPanel?: boolean;
} | null>(null);

export function isTabKey(key: unknown): key is TabKey {
  return (
    (typeof key === 'string' && key.length > 0) ||
    (typeof key === 'number' && Number.isFinite(key))
  );
}

export function getItemIdentity(id: string | undefined, itemKey: TabKey) {
  if (!isTabKey(itemKey)) {
    throw new Error(
      'Tab and TabPanel require a nonempty string or finite numeric itemKey.',
    );
  }

  const token = JSON.stringify(itemKey);
  return {
    token,
    id: id === undefined ? undefined : `${id}-${encodeURIComponent(token)}`,
  };
}
