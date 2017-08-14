import React from 'react';
import TabList from '../../components/TabList';

export default function TabListWrapper(props) {
  return <TabList {...props} />;
}

TabListWrapper.tabsRole = 'TabList';
