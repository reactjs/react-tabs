import React from 'react';
import TabPanel from '../../components/TabPanel';

export default function TabPanelWrapper(props) {
  return <TabPanel {...props} />;
}

TabPanelWrapper.tabsRole = 'TabPanel';
