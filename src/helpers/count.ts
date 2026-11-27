import type { ReactNode } from 'react';
import { deepForEach } from './childrenDeepMap';
import { isTab } from './elementTypes';

export function getTabsCount(children: ReactNode) {
  let tabCount = 0;
  deepForEach(children, (child) => {
    if (isTab(child)) tabCount++;
  });

  return tabCount;
}
