/* global describe, it, expect */
import ReactTabs, { Tab, Tabs, TabList, TabPanel } from '../main';
import TabComponent from '../components/Tab';
import TabListComponent from '../components/TabList';
import TabsComponent from '../components/Tabs';
import TabPanelComponent from '../components/TabPanel';

describe('main.js', () => {
  it('should correctly export all component as named export', () => {
    expect(Tab).toEqual(TabComponent);
    expect(TabList).toEqual(TabListComponent);
    expect(Tabs).toEqual(TabsComponent);
    expect(TabPanel).toEqual(TabPanelComponent);
  });

  it('should correctly export all components as legacy es6 export', () => {
    expect(ReactTabs.Tab).toEqual(TabComponent);
    expect(ReactTabs.TabList).toEqual(TabListComponent);
    expect(ReactTabs.Tabs).toEqual(TabsComponent);
    expect(ReactTabs.TabPanel).toEqual(TabPanelComponent);
  });
});
