import React from 'react';
import Children from 'react-children-utilities';
import TabList from '../components/TabList';
import Tab from '../components/Tab';
import TabPanel from '../components/TabPanel';

export function getTabsCount(children) {
  let tabList;
  Children.deepForEach(children, c => {
    if (!tabList && c.type === TabList) tabList = c;
  });

  if (tabList && tabList.props.children) {
    return React.Children.count(
      React.Children.toArray(tabList.props.children).filter(x => x.type === Tab),
    );
  }

  return 0;
}

export function getPanelsCount(children) {
  return React.Children.count(React.Children.toArray(children).filter(x => x.type === TabPanel));
}
