import { deepForEach } from '../helpers/childrenDeepMap';
import Tab from '../components/Tab';
import TabPanel from '../components/TabPanel';

export function getTabsCount(children) {
  let tabCount = 0;
  deepForEach(children, child => {
    if (child.type === Tab) tabCount++;
  });

  return tabCount;
}

export function getPanelsCount(children) {
  let panelCount = 0;
  deepForEach(children, child => {
    if (child.type === TabPanel) panelCount++;
  });

  return panelCount;
}
