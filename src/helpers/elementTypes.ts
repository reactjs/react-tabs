import type { ReactElement } from 'react';
import type { ReactTabsFunctionComponent } from '../types';

function makeTypeChecker(tabsRole: ReactTabsFunctionComponent['tabsRole']) {
  return ({ type }: ReactElement) =>
    ((typeof type === 'object' && type !== null) ||
      typeof type === 'function') &&
    'tabsRole' in type &&
    type.tabsRole === tabsRole;
}

export const isTab = makeTypeChecker('Tab');
export const isTabList = makeTypeChecker('TabList');
export const isTabPanel = makeTypeChecker('TabPanel');
