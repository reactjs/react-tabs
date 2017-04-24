import React from 'react';
import TabList from '../components/TabList';
import Tab from '../components/Tab';
import TabPanel from '../components/TabPanel';

export function getTabsCount(children) {
  const tabLists = React.Children
    .toArray(children)
    .filter(x => x.type === TabList);

  if (tabLists[0] && tabLists[0].props.children) {
    return React.Children.count(
      React.Children
        .toArray(tabLists[0].props.children)
        .filter(x => x.type === Tab),
    );
  }

  return 0;
}

export function getPanelsCount(children) {
  return React.Children.count(
    React.Children.toArray(children).filter(x => x.type === TabPanel),
  );
}
