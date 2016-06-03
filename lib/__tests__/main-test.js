/* global describe, it, expect */
import { Tab, Tabs, TabList, TabPanel } from '../main';
import TabComponent from '../components/Tab';
import TabListComponent from '../components/TabList';
import TabsComponent from '../components/Tabs';
import TabPanelComponent from '../components/TabPanel';

describe('<TabList />', () => {
  it('should correctly export all components', () => {
    expect(Tab).toEqual(TabComponent);
    expect(TabList).toEqual(TabListComponent);
    expect(Tabs).toEqual(TabsComponent);
    expect(TabPanel).toEqual(TabPanelComponent);
  });
});
